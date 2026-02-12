# Admin Registration Approval Workflow - Technical Analysis & Implementation Plan

## Executive Summary

This document provides a comprehensive analysis of the NationCite codebase and outlines the implementation plan for the admin registration approval workflow with email notifications.

---

## Part 1: Current System Analysis

### 1.1 Technology Stack

| Component        | Technology                                      |
| ---------------- | ----------------------------------------------- |
| Framework        | Next.js 16.0.7 with Turbopack                   |
| Database         | PostgreSQL with Prisma ORM v5.22.0              |
| Authentication   | JWT tokens in HTTP-only cookies                 |
| Password Hashing | bcryptjs                                        |
| Email            | Nodemailer with Gmail SMTP                      |
| Runtime          | Edge Runtime for middleware (no Node.js crypto) |

### 1.2 Database Schema Overview

#### Core Authentication Tables

```
AuthUser
├── id, email, passwordHash
├── role (ADMIN | SCHOLAR | ORG)
├── isEmailVerified, isActive
├── lastLoginAt, createdAt, updatedAt
└── registration (one-to-one)

Registration
├── id, nationciteId, type, status
├── authUserId (nullable until approval)
├── ticketId
└── Relations: authUser, ticket, medical/researcher/orgReg
```

#### Pre-Seeded Public Data Tables

```
ScholarsPublic
├── nationciteId (SC0000001, SC0000002, etc.)
├── worldRank, countryRank, universityRank
├── scholarName, orgName
├── mainSubject, subField
├── hIndexTotal, hIndexLast5, hIndexRatio

OrgsPublic
├── nationciteId (ORG0000001, etc.)
├── worldRank, countryRank
├── orgName, hIndexTotal, hIndexLast5
```

#### Registration-Specific Tables

```
MedicalProfessional
├── registrationId, nationciteId
├── name, medCouncilRegNo, stateCouncil
├── mobile, email, primaryHospital
├── specialty, researchFocus
├── medicalDegreeUrl, regCertificateUrl
├── status, plan

Researchers
├── registrationId, nationciteId
├── name, institute, instituteEmail
├── orcidId, institutionalIdCardUrl
├── mobile, email, primaryDomain
├── googleScholarUrl, profilePhotoUrl
├── status, plan

OrgsRegistered
├── registrationId, nationciteId
├── domain, name, email, number
├── letterOfAuthorizationUrl
├── accreditationProofUrl
├── status, plan
```

#### Ticket System Tables

```
Tickets
├── ticketId (TCK-YYYYMMDD-XXXX)
├── nationciteId (temp ID like REG20250214AB12)
├── name, type, issueType, description
├── status (PENDING | OPEN | APPROVED | REJECTED)
├── createdAt, updatedAt
└── Relations: registration[], comments[]

TicketComments
├── id, ticketId, comments, attachments, createdAt
```

### 1.3 Current Registration Flow

```
User submits registration
         │
         ▼
┌─────────────────────────────────────────┐
│ POST /api/registration/scholars         │
│ - Generate temp nationciteId (REG...)   │
│ - Generate ticketId (TCK-...)           │
│ - Create Ticket (status: PENDING)       │
│ - Create Registration (status: PENDING) │
│ - Create MedicalProfessional/Researchers│
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ sendRegistrationMail()                  │
│ - Sends ticket ID to user               │
│ - User can track registration status    │
└─────────────────────────────────────────┘
         │
         ▼
    ⏳ WAITING FOR ADMIN APPROVAL
         │
         ▼
┌─────────────────────────────────────────┐
│ PATCH /api/tickets/registration-approve │
│ Admin provides:                         │
│ - ticketId                              │
│ - nationciteId (real ID from preseeded) │
│                                         │
│ Actions:                                │
│ 1. Update ticket status → APPROVED      │
│ 2. Update registration → APPROVED       │
│ 3. Update type-specific table           │
│ 4. Generate temp password               │
│ 5. Create AuthUser with credentials     │
│ 6. Send credentials email to user       │
└─────────────────────────────────────────┘
```

### 1.4 Current API Endpoints

| Endpoint                            | Method | Purpose                                  |
| ----------------------------------- | ------ | ---------------------------------------- |
| `/api/registration/scholars`        | POST   | Submit researcher/medical registration   |
| `/api/registration/orgs`            | POST   | Submit organization registration         |
| `/api/tickets/tickets-get`          | GET    | Admin: List/filter tickets               |
| `/api/tickets/[id]`                 | GET    | Admin: Get single ticket details         |
| `/api/tickets/tickets-post`         | POST   | Create general ticket (not registration) |
| `/api/tickets/registration-approve` | PATCH  | Admin: Approve registration              |
| `/api/auth/login`                   | POST   | User login                               |
| `/api/auth/logout`                  | POST   | User logout                              |
| `/api/scholars`                     | GET    | Get scholars list                        |
| `/api/orgs`                         | GET    | Get organizations list                   |

### 1.5 Email System (lib/mailer.ts)

Current email functions:

```typescript
sendRegistrationMail({ to, name, ticketId })
  → Sends ticket confirmation after submission

sendApprovalCredentialsMail({ to, name, username, password })
  → Sends login credentials after approval
```

Uses Gmail SMTP with:

- `MAIL_USER` - Gmail address
- `MAIL_PASS` - App password

### 1.6 Admin Dashboard Structure

```
app/(admin)/admin-overview/
├── page.tsx              → Main dashboard (Command Center)
├── adminstyle.css
├── component/
│   ├── dashboardsidebar.tsx
│   ├── DashboardHeader.tsx
│   └── SidebarItem.tsx
├── tickets/
│   └── page.tsx          → Tickets page (uses mock data)
├── user-management/
│   └── page.tsx
├── dataset/
├── monetization/
└── ...
```

Current sidebar items:

- Dashboard (`/admin-overview`)
- User Management (`/admin-overview/user-management`)
- Analytics
- Monetization (`/admin-overview/monetization`)
- Tickets (`/admin-overview/tickets`)

### 1.7 Current Issues Identified

1. **Admin Notification Missing**: No email sent to admin when new registration is submitted
2. **Tickets Page Uses Mock Data**: Not connected to real `/api/tickets/tickets-get` API
3. **No Registration Requests Page**: No dedicated page to view/compare registration requests
4. **No Comparison View**: Admin cannot compare submitted data vs pre-seeded data
5. **Manual NationCite ID Entry**: Admin must manually provide the nationciteId to approve

---

## Part 2: Proposed Implementation

### 2.1 High-Level Architecture

```
NEW FLOW:
=========

User submits registration
         │
         ▼
┌─────────────────────────────────────────┐
│ POST /api/registration/scholars         │
│ (Existing + NEW: send admin email)      │
└─────────────────────────────────────────┘
         │
         ├──────────────────────────────────┐
         ▼                                  ▼
┌─────────────────────┐     ┌──────────────────────────────┐
│ Email to USER       │     │ NEW: Email to ADMIN          │
│ (ticket ID)         │     │ (notification + link to new  │
│                     │     │  registration requests page) │
└─────────────────────┘     └──────────────────────────────┘
                                           │
                                           ▼
                            ┌──────────────────────────────┐
                            │ NEW: Registration Requests   │
                            │ Admin Page                   │
                            │ - List pending registrations │
                            │ - Filter by type             │
                            │ - Click to view details      │
                            └──────────────────────────────┘
                                           │
                                           ▼
                            ┌──────────────────────────────┐
                            │ NEW: Comparison View Page    │
                            │ - Show submitted data        │
                            │ - Match against pre-seeded   │
                            │ - Highlight mismatches       │
                            │ - Select nationciteId        │
                            │ - Approve/Reject buttons     │
                            └──────────────────────────────┘
                                           │
                                           ▼
                            ┌──────────────────────────────┐
                            │ PATCH /api/tickets/          │
                            │ registration-approve         │
                            │ (Existing - no changes)      │
                            └──────────────────────────────┘
                                           │
                                           ▼
                            ┌──────────────────────────────┐
                            │ Email to USER                │
                            │ (login credentials)          │
                            └──────────────────────────────┘
```

### 2.2 Changes Required

#### 2.2.1 Email Changes

**File: `lib/mailer.ts`**

Add new function:

```typescript
sendAdminNotificationMail({
  type: "REGISTRATION" | "TICKET",
  ticketId: string,
  registrantName: string,
  registrationType: "MEDICAL" | "RESEARCHER" | "ORG",
  email: string,
});
```

Email content:

- Subject: `[NationCite] New Registration Request - ${ticketId}`
- Body: Basic details + link to `/admin-overview/registration-requests/${ticketId}`

**Environment Variables Required:**

- `ADMIN_NOTIFICATION_EMAIL` - Email address(es) for admin notifications

#### 2.2.2 API Changes

**File: `app/api/registration/scholars/route.ts`**

- After successful registration, call `sendAdminNotificationMail()`

**File: `app/api/registration/orgs/route.ts`** (if exists, otherwise create)

- Same pattern as scholars

**New File: `app/api/tickets/registration-requests/route.ts`**

- GET: Fetch all tickets with `issueType: "NEW_REGISTRATION"`
- Returns enhanced data with registration details

**New File: `app/api/tickets/registration-compare/[ticketId]/route.ts`**

- GET: Fetch ticket + registration data + matching pre-seeded candidates
- Matching logic:
  - For RESEARCHER/MEDICAL: Search ScholarsPublic by name similarity
  - For ORG: Search OrgsPublic by name similarity
- Return both submitted data and potential matches

#### 2.2.3 Frontend Changes

**New Sidebar Item:**

- Add "Registration Requests" to `dashboardsidebar.tsx`
- Badge showing count of pending registrations

**New Page: `app/(admin)/admin-overview/registration-requests/page.tsx`**

- Table showing pending registration requests
- Columns: Ticket ID, Name, Type, Submitted Date, Status, Actions
- Filter by type (MEDICAL, RESEARCHER, ORG)
- Click row → Navigate to comparison view

**New Page: `app/(admin)/admin-overview/registration-requests/[ticketId]/page.tsx`**

- Two-column comparison view:
  - Left: Submitted registration data
  - Right: Pre-seeded data (searchable/selectable)
- Mismatch highlighting (color-coded)
- "Select Match" button to choose pre-seeded record
- "Approve" button → calls registration-approve API
- "Reject" button → updates ticket status to REJECTED

### 2.3 Database Changes

**No schema changes required!**

All necessary tables and relationships already exist:

- Tickets with `issueType: "NEW_REGISTRATION"`
- Registration with status tracking
- Pre-seeded ScholarsPublic/OrgsPublic for matching

### 2.4 Implementation Order

| Phase | Task                                                      | Priority |
| ----- | --------------------------------------------------------- | -------- |
| 1     | Add `sendAdminNotificationMail()` to mailer.ts            | High     |
| 2     | Update registration APIs to send admin email              | High     |
| 3     | Create `/api/tickets/registration-requests` API           | High     |
| 4     | Create `/api/tickets/registration-compare/[ticketId]` API | High     |
| 5     | Add sidebar item for Registration Requests                | Medium   |
| 6     | Create Registration Requests list page                    | High     |
| 7     | Create Comparison View page                               | High     |
| 8     | Add rejection functionality to approve API                | Medium   |
| 9     | Update tickets page to use real API                       | Low      |

### 2.5 Files to Create

```
lib/
└── mailer.ts (MODIFY)

app/api/tickets/
├── registration-requests/
│   └── route.ts (NEW)
└── registration-compare/
    └── [ticketId]/
        └── route.ts (NEW)

app/(admin)/admin-overview/
├── component/
│   └── dashboardsidebar.tsx (MODIFY)
├── registration-requests/
│   ├── page.tsx (NEW)
│   ├── style.css (NEW)
│   ├── components/
│   │   ├── RegistrationTable.tsx (NEW)
│   │   └── RegistrationFilters.tsx (NEW)
│   └── [ticketId]/
│       ├── page.tsx (NEW)
│       ├── style.css (NEW)
│       └── components/
│           ├── ComparisonView.tsx (NEW)
│           ├── SubmittedDataCard.tsx (NEW)
│           ├── PreseededDataCard.tsx (NEW)
│           └── ActionButtons.tsx (NEW)
```

### 2.6 Environment Variables

Add to `.env`:

```
ADMIN_NOTIFICATION_EMAIL=admin@nationcite.com
```

---

## Part 3: Detailed Component Specifications

### 3.1 Admin Notification Email Template

```html
Subject: [NationCite] New Registration Request - TCK-20250214-0001 Dear Admin, A
new registration request has been submitted and requires your review.
─────────────────────────────────────── REGISTRATION DETAILS
─────────────────────────────────────── Ticket ID: TCK-20250214-0001 Name: Dr.
John Smith Type: RESEARCHER Email: john.smith@university.edu Submitted: February
14, 2025 ─────────────────────────────────────── Please review this request at:
https://nationcite.com/admin-overview/registration-requests/TCK-20250214-0001
Best regards, NationCite System
```

### 3.2 Registration Requests Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Registration Requests                      [Pending: 5]     │
│ Review and manage new registration submissions              │
├─────────────────────────────────────────────────────────────┤
│ [Search...        ] [Type ▼] [Status ▼] [Date Range]        │
├─────────────────────────────────────────────────────────────┤
│ Ticket ID    │ Name           │ Type       │ Date    │ Act  │
├──────────────┼────────────────┼────────────┼─────────┼──────┤
│ TCK-0001     │ Dr. John Smith │ RESEARCHER │ 14 Feb  │ [→]  │
│ TCK-0002     │ City Hospital  │ ORG        │ 13 Feb  │ [→]  │
│ TCK-0003     │ Dr. Jane Doe   │ MEDICAL    │ 12 Feb  │ [→]  │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Comparison View Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│ ← Back to Registration Requests                             │
│                                                             │
│ Registration Review - TCK-20250214-0001                     │
│ Compare submitted data with existing records                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────────────────────────┐  ┌─────────────────────────┐   │
│ │ SUBMITTED DATA          │  │ MATCHING RECORD         │   │
│ ├─────────────────────────┤  ├─────────────────────────┤   │
│ │ Name: Dr. John Smith    │  │ [Select a match ▼]      │   │
│ │ Email: john@univ.edu    │  │                         │   │
│ │ Institute: MIT          │  │ Options:                │   │
│ │ ORCID: 0000-0001-...    │  │ • SC0000007 - J. Smith  │   │
│ │ Domain: Physics         │  │ • SC0000015 - John S.   │   │
│ │ Google Scholar: url     │  │ • SC0000023 - J Smith   │   │
│ │                         │  │ • [Enter custom ID]     │   │
│ └─────────────────────────┘  └─────────────────────────┘   │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ COMPARISON RESULTS (after selection)                    ││
│ ├─────────────────────────────────────────────────────────┤│
│ │ Field          │ Submitted       │ Pre-seeded │ Match  ││
│ ├────────────────┼─────────────────┼────────────┼────────┤│
│ │ Name           │ Dr. John Smith  │ John Smith │ ⚠ Diff ││
│ │ Organization   │ MIT             │ MIT        │ ✓ Match││
│ │ H-Index        │ N/A             │ 45         │ —      ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ ┌───────────────────────────────────────────────────────┐  │
│ │ Admin Notes:                                          │  │
│ │ [                                                   ] │  │
│ └───────────────────────────────────────────────────────┘  │
│                                                             │
│               [Reject Registration]    [Approve & Assign]   │
└─────────────────────────────────────────────────────────────┘
```

### 3.4 Matching Algorithm

For finding pre-seeded record matches:

```typescript
// Pseudo-code for matching logic
async function findPotentialMatches(submittedData, type) {
  if (type === "RESEARCHER" || type === "MEDICAL") {
    // Search ScholarsPublic
    const matches = await prisma.scholarsPublic.findMany({
      where: {
        OR: [
          {
            scholarName: { contains: submittedData.name, mode: "insensitive" },
          },
          {
            orgName: { contains: submittedData.institute, mode: "insensitive" },
          },
        ],
      },
      take: 10,
      orderBy: { worldRank: "asc" },
    });
    return matches;
  }

  if (type === "ORG") {
    // Search OrgsPublic
    const matches = await prisma.orgsPublic.findMany({
      where: {
        orgName: { contains: submittedData.name, mode: "insensitive" },
      },
      take: 10,
      orderBy: { worldRank: "asc" },
    });
    return matches;
  }
}
```

---

## Part 4: Risk Assessment & Edge Cases

### 4.1 Edge Cases to Handle

| Case                               | Handling Strategy                                   |
| ---------------------------------- | --------------------------------------------------- |
| No matching pre-seeded record      | Allow admin to manually enter nationciteId          |
| Multiple similar matches           | Display ranked list, admin chooses                  |
| Duplicate registration attempts    | Check for existing registration with same email     |
| Admin email delivery failure       | Log error, continue with registration (don't block) |
| Rejection after partial processing | Transaction rollback                                |

### 4.2 Security Considerations

1. All new admin endpoints must use `requireAdmin()` middleware
2. Validate ticketId format before database queries
3. Sanitize search inputs for matching queries
4. Rate limit admin notification emails

### 4.3 Performance Considerations

1. Index `issueType` column on Tickets table for faster filtering
2. Paginate registration requests list
3. Cache pre-seeded data search results briefly

---

## Part 5: Testing Checklist

### 5.1 API Testing

- [ ] Registration creates ticket and sends admin email
- [ ] `/api/tickets/registration-requests` returns only NEW_REGISTRATION tickets
- [ ] `/api/tickets/registration-compare/[id]` returns comparison data
- [ ] Approval flow creates AuthUser and sends credentials

### 5.2 UI Testing

- [ ] Registration Requests page loads with real data
- [ ] Filtering works correctly
- [ ] Comparison view displays correctly
- [ ] Match selection works
- [ ] Approve button triggers API and shows success
- [ ] Reject button triggers API and shows confirmation

### 5.3 Email Testing

- [ ] Admin receives notification email
- [ ] Email link navigates to correct page
- [ ] User receives credentials after approval

---

## Approval Required

Please review this technical analysis and implementation plan. Confirm:

1. **Approach is correct?** - The overall architecture and flow
2. **Priorities are right?** - Implementation order makes sense
3. **Any missing requirements?** - Features not covered
4. **Ready to proceed?** - Begin implementation

Once approved, I will proceed with Phase 1 implementation.
