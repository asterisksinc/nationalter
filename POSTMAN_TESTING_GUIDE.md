# NationCite API Testing Guide - Postman Flows

This document contains 5 complete testing flows for the NationCite registration and admin approval system.

## Environment Setup

Create a new Postman environment with these variables:

| Variable        | Value                    |
| --------------- | ------------------------ |
| `baseUrl`       | `http://localhost:3001`  |
| `adminEmail`    | `admin@nationcite.com`   |
| `adminPassword` | `your-admin-password`    |
| `adminToken`    | (set after login)        |
| `ticketId`      | (set after registration) |

---

## Flow 1: Researcher Registration (End-to-End)

### Step 1.1: Submit Researcher Registration

**Request:**

```
POST {{baseUrl}}/api/registration/scholars
Content-Type: application/json
```

**Body:**

```json
{
  "type": "RESEARCHER",
  "name": "Dr. John Smith",
  "email": "john.smith@university.edu",
  "mobile": "9876543210",
  "institute": "Indian Institute of Technology, Delhi",
  "instituteEmail": "john.smith@university.edu",
  "orcidId": "0000-0002-1234-5678",
  "institutionalIdCardUrl": "https://example.com/id-card.pdf",
  "primaryDomain": "Computer Science",
  "googleScholarUrl": "https://scholar.google.com/citations?user=abc123",
  "profilePhotoUrl": "https://example.com/photo.jpg"
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Registration submitted successfully",
  "data": {
    "ticketId": "TCK-20260212-0001",
    "nationciteId": "REG20260212ABCD",
    "registrationId": 1
  }
}
```

**Post-request Script:**

```javascript
if (pm.response.code === 201) {
  var data = pm.response.json().data;
  pm.environment.set("ticketId", data.ticketId);
  pm.environment.set("tempNationCiteId", data.nationciteId);
  console.log("Ticket ID saved:", data.ticketId);
}
```

### Step 1.2: Admin Login

**Request:**

```
POST {{baseUrl}}/api/auth/login
Content-Type: application/json
```

**Body:**

```json
{
  "email": "{{adminEmail}}",
  "password": "{{adminPassword}}"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Login successful"
}
```

**Note:** The response sets HTTP-only cookies. Postman will automatically include these in subsequent requests.

### Step 1.3: Get Registration Requests List

**Request:**

```
GET {{baseUrl}}/api/registration/requests?status=PENDING
```

**Expected Response (200):**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "nationciteId": "REG20260212ABCD",
      "type": "RESEARCHER",
      "status": "PENDING",
      "ticketId": "TCK-20260212-0001",
      "createdAt": "2026-02-12T10:00:00.000Z",
      "name": "Dr. John Smith",
      "email": "john.smith@university.edu"
    }
  ]
}
```

### Step 1.4: Get Compare Data for Registration

**Request:**

```
GET {{baseUrl}}/api/registration/compare/{{ticketId}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "registration": {
      "id": 1,
      "nationciteId": "REG20260212ABCD",
      "type": "RESEARCHER",
      "status": "PENDING",
      "ticketId": "TCK-20260212-0001"
    },
    "ticket": {
      "ticketId": "TCK-20260212-0001",
      "name": "Dr. John Smith",
      "type": "RESEARCHER",
      "status": "PENDING",
      "createdAt": "2026-02-12T10:00:00.000Z"
    },
    "registrantData": {
      "id": 1,
      "name": "Dr. John Smith",
      "email": "john.smith@university.edu",
      "institute": "Indian Institute of Technology, Delhi",
      "orcidId": "0000-0002-1234-5678",
      "primaryDomain": "Computer Science",
      "googleScholarUrl": "https://scholar.google.com/citations?user=abc123"
    },
    "potentialMatches": [
      {
        "nationciteId": "SC0000007",
        "name": "John Smith",
        "organization": "IIT Delhi",
        "hIndexTotal": 45,
        "worldRank": 1250
      }
    ]
  }
}
```

### Step 1.5: Approve Registration

**Request:**

```
PATCH {{baseUrl}}/api/tickets/registration-approve
Content-Type: application/json
```

**Body:**

```json
{
  "ticketId": "{{ticketId}}",
  "nationciteId": "SC0000007"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Registration approved. Credentials sent to user."
}
```

---

## Flow 2: Medical Professional Registration

### Step 2.1: Submit Medical Registration

**Request:**

```
POST {{baseUrl}}/api/registration/scholars
Content-Type: application/json
```

**Body:**

```json
{
  "type": "MEDICAL",
  "name": "Dr. Priya Sharma",
  "email": "priya.sharma@hospital.org",
  "mobile": "9876543211",
  "medCouncilRegNo": "MCI-12345",
  "stateCouncil": "Delhi Medical Council",
  "primaryHospital": "Apollo Hospitals",
  "specialty": "Cardiology",
  "researchFocus": "Clinical Trials",
  "medicalDegreeUrl": "https://example.com/degree.pdf",
  "regCertificateUrl": "https://example.com/certificate.pdf"
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Registration submitted successfully",
  "data": {
    "ticketId": "TCK-20260212-0002",
    "nationciteId": "REG20260212EFGH",
    "registrationId": 2
  }
}
```

### Step 2.2: Admin Reviews and Approves

Follow Steps 1.2-1.5 with the new ticketId.

---

## Flow 3: Organization Registration

### Step 3.1: Submit Organization Registration

**Request:**

```
POST {{baseUrl}}/api/registration/orgs
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Delhi University",
  "domain": "du.ac.in",
  "email": "registrar@du.ac.in",
  "number": "9876543212",
  "letterOfAuthorizationUrl": "https://example.com/authorization.pdf",
  "accreditationProofUrl": "https://example.com/naac.pdf"
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Organization registration submitted successfully",
  "data": {
    "ticketId": "TCK-20260212-0003",
    "nationciteId": "REG20260212IJKL",
    "registrationId": 3,
    "orgId": 1
  }
}
```

### Step 3.2: Admin Assigns Organization ID

**Request:**

```
PATCH {{baseUrl}}/api/tickets/registration-approve
Content-Type: application/json
```

**Body:**

```json
{
  "ticketId": "TCK-20260212-0003",
  "nationciteId": "ORG0000001"
}
```

---

## Flow 4: Registration Rejection Flow

### Step 4.1: Submit Registration (use any type from Flows 1-3)

### Step 4.2: Admin Login (see Step 1.2)

### Step 4.3: Reject Registration

**Request:**

```
PATCH {{baseUrl}}/api/registration/reject
Content-Type: application/json
```

**Body:**

```json
{
  "ticketId": "{{ticketId}}",
  "reason": "Submitted documents could not be verified. Please resubmit with clearer copies."
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Registration rejected successfully"
}
```

### Step 4.4: Verify Registration Status Changed

**Request:**

```
GET {{baseUrl}}/api/registration/requests?status=REJECTED
```

**Expected Response:**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "status": "REJECTED",
      "ticketId": "TCK-20260212-0001"
    }
  ]
}
```

---

## Flow 5: Validation Error Handling

### Step 5.1: Missing Required Fields

**Request:**

```
POST {{baseUrl}}/api/registration/scholars
Content-Type: application/json
```

**Body:**

```json
{
  "type": "RESEARCHER",
  "name": "Test User"
}
```

**Expected Response (400):**

```json
{
  "success": false,
  "message": "Missing required fields"
}
```

### Step 5.2: Invalid Registration Type

**Request:**

```
POST {{baseUrl}}/api/registration/scholars
Content-Type: application/json
```

**Body:**

```json
{
  "type": "INVALID_TYPE",
  "name": "Test User",
  "email": "test@example.com",
  "mobile": "1234567890"
}
```

**Expected Response (400):**

```json
{
  "success": false,
  "message": "Invalid registration type"
}
```

### Step 5.3: Approve Non-existent Ticket

**Request:**

```
PATCH {{baseUrl}}/api/tickets/registration-approve
Content-Type: application/json
```

**Body:**

```json
{
  "ticketId": "TCK-INVALID-9999",
  "nationciteId": "SC0000001"
}
```

**Expected Response (404):**

```json
{
  "success": false,
  "message": "Ticket not found"
}
```

### Step 5.4: Approve Already Approved Registration

**Request:**

```
PATCH {{baseUrl}}/api/tickets/registration-approve
Content-Type: application/json
```

**Body:**

```json
{
  "ticketId": "TCK-20260212-0001",
  "nationciteId": "SC0000001"
}
```

**Expected Response (400):**

```json
{
  "success": false,
  "message": "Ticket already approved"
}
```

### Step 5.5: Unauthorized Admin Access

**Request (without login/cookies):**

```
GET {{baseUrl}}/api/registration/requests
```

**Expected Response (401):**

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

## API Endpoints Summary

| Endpoint                               | Method | Auth  | Description                            |
| -------------------------------------- | ------ | ----- | -------------------------------------- |
| `/api/registration/scholars`           | POST   | No    | Submit researcher/medical registration |
| `/api/registration/orgs`               | POST   | No    | Submit organization registration       |
| `/api/registration/requests`           | GET    | Admin | List registration requests             |
| `/api/registration/compare/[ticketId]` | GET    | Admin | Get registration details with matches  |
| `/api/registration/reject`             | PATCH  | Admin | Reject registration                    |
| `/api/tickets/registration-approve`    | PATCH  | Admin | Approve registration                   |
| `/api/auth/login`                      | POST   | No    | User login                             |
| `/api/auth/logout`                     | POST   | Yes   | User logout                            |

---

## Postman Collection Import

To import these tests into Postman:

1. Create a new Collection named "NationCite Registration API"
2. Add folder structure:
   - Flow 1: Researcher Registration
   - Flow 2: Medical Registration
   - Flow 3: Organization Registration
   - Flow 4: Rejection Flow
   - Flow 5: Validation Errors
3. Add each request as documented above
4. Set up the environment variables
5. Run tests in sequence within each flow

## Notes

- All admin endpoints require authentication via HTTP-only cookies
- After login, cookies are automatically included in subsequent requests
- The `ticketId` format is `TCK-YYYYMMDD-XXXX`
- The `nationciteId` for pre-seeded data follows format `SC0000XXX` (scholars) or `ORG000XXX` (organizations)
- Email notifications are sent asynchronously - check SMTP configuration if not receiving
