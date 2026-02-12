# NationCite Database Schema Documentation

## Enum Types

### RegistrationStatus

- `PENDING`
- `APPROVED`
- `REJECTED`

### UserRole

- `ADMIN`
- `SCHOLAR`
- `ORG`

---

## Core Tables

### AuthUser

Authentication and user credentials

| Column            | Type     | Constraints                  | Notes |
| ----------------- | -------- | ---------------------------- | ----- |
| `id`              | Int      | Primary Key (auto-increment) |       |
| `email`           | String   | Unique                       |       |
| `passwordHash`    | String   | Required                     |       |
| `role`            | UserRole | Default: SCHOLAR             |       |
| `isEmailVerified` | Boolean  | Default: false               |       |
| `isActive`        | Boolean  | Default: true                |       |
| `lastLoginAt`     | DateTime | Optional                     |       |
| `createdAt`       | DateTime | Default: now()               |       |
| `updatedAt`       | DateTime | Auto-update                  |       |

---

### Registration

Parent record for all registration types (Medical, Researchers, Organizations)

| Column         | Type               | Constraints                  | Notes                  |
| -------------- | ------------------ | ---------------------------- | ---------------------- |
| `id`           | Int                | Primary Key (auto-increment) |                        |
| `nationciteId` | String             | Required                     |                        |
| `type`         | String             | Required                     | MEDICAL/RESEARCHER/ORG |
| `status`       | RegistrationStatus | Default: PENDING             |                        |
| `authUserId`   | Int                | Optional, Unique, FK         | References AuthUser    |
| `ticketId`     | String             | Optional, FK                 | References Tickets     |

---

## Registration Type Tables

### MedicalProfessional

| Column              | Type   | Constraints                  | Notes                               |
| ------------------- | ------ | ---------------------------- | ----------------------------------- |
| `id`                | Int    | Primary Key (auto-increment) |                                     |
| `registrationId`    | Int    | Optional, Unique, FK         | References Registration             |
| `nationciteId`      | String | Optional                     |                                     |
| `name`              | String | **Required**                 |                                     |
| `medCouncilRegNo`   | String | **Required**                 | Medical Council Registration Number |
| `stateCouncil`      | String | **Required**                 |                                     |
| `mobile`            | String | **Required**                 |                                     |
| `email`             | String | **Required**                 |                                     |
| `primaryHospital`   | String | **Required**                 |                                     |
| `specialty`         | String | **Required**                 | Medical specialty                   |
| `researchFocus`     | String | **Required**                 |                                     |
| `medicalDegreeUrl`  | String | Optional                     | Document URL                        |
| `regCertificateUrl` | String | Optional                     | Document URL                        |
| `status`            | String | **Required**                 | ACTIVE/PENDING/REJECTED             |
| `plan`              | String | **Required**                 | Subscription plan                   |

---

### Researchers

| Column                   | Type   | Constraints                  | Notes                         |
| ------------------------ | ------ | ---------------------------- | ----------------------------- |
| `id`                     | Int    | Primary Key (auto-increment) |                               |
| `registrationId`         | Int    | Optional, Unique, FK         | References Registration       |
| `nationciteId`           | String | Optional                     |                               |
| `name`                   | String | **Required**                 |                               |
| `institute`              | String | **Required**                 | University/Research Institute |
| `instituteEmail`         | String | **Required**                 | Official institute email      |
| `orcidId`                | String | **Required**                 | ORCID identifier              |
| `institutionalIdCardUrl` | String | Optional                     | Document URL                  |
| `mobile`                 | String | **Required**                 |                               |
| `email`                  | String | **Required**                 |                               |
| `primaryDomain`          | String | **Required**                 | Research domain/field         |
| `googleScholarUrl`       | String | **Required**                 | Google Scholar profile        |
| `profilePhotoUrl`        | String | **Required**                 | Profile picture URL           |
| `status`                 | String | **Required**                 | ACTIVE/PENDING/REJECTED       |
| `plan`                   | String | **Required**                 | Subscription plan             |

---

### OrgsRegistered

| Column                     | Type   | Constraints                  | Notes                       |
| -------------------------- | ------ | ---------------------------- | --------------------------- |
| `id`                       | Int    | Primary Key (auto-increment) |                             |
| `registrationId`           | Int    | Optional, Unique, FK         | References Registration     |
| `nationciteId`             | String | Optional                     |                             |
| `domain`                   | String | **Required**                 | Organization domain         |
| `name`                     | String | **Required**                 | Organization name           |
| `email`                    | String | **Required**                 | Official email              |
| `number`                   | String | **Required**                 | Registration/License number |
| `letterOfAuthorizationUrl` | String | **Required**                 | Document URL                |
| `accreditationProofUrl`    | String | **Required**                 | Document URL                |
| `status`                   | String | **Required**                 | ACTIVE/PENDING/REJECTED     |
| `plan`                     | String | **Required**                 | Subscription plan           |

---

## Public Data Tables (No Login)

### ScholarsPublic

Public scholar rankings and statistics

| Column           | Type   | Constraints                  | Notes                   |
| ---------------- | ------ | ---------------------------- | ----------------------- |
| `id`             | Int    | Primary Key (auto-increment) |                         |
| `nationciteId`   | String | Unique                       |                         |
| `worldRank`      | Int    | Optional                     | Global ranking          |
| `countryRank`    | Int    | Optional                     | Country ranking         |
| `universityRank` | Int    | Optional                     | Institution ranking     |
| `scholarName`    | String | Required                     |                         |
| `orgName`        | String | Required                     | Organization/University |
| `mainSubject`    | String | Optional                     | Primary discipline      |
| `subField`       | String | Optional                     | Secondary field         |
| `hIndexTotal`    | Int    | Required                     | H-index lifetime        |
| `hIndexLast5`    | Int    | Required                     | H-index last 5 years    |
| `hIndexRatio`    | Float  | Required                     | H-index ratio           |

---

### OrgsPublic

Public organization rankings and statistics

| Column         | Type   | Constraints                  | Notes                |
| -------------- | ------ | ---------------------------- | -------------------- |
| `id`           | Int    | Primary Key (auto-increment) |                      |
| `nationciteId` | String | Unique                       |                      |
| `worldRank`    | Int    | Optional                     | Global ranking       |
| `countryRank`  | Int    | Optional                     | Country ranking      |
| `orgName`      | String | Required                     | Organization name    |
| `hIndexTotal`  | Int    | Required                     | H-index lifetime     |
| `hIndexLast5`  | Int    | Required                     | H-index last 5 years |

---

## Support & Workflow Tables

### Tickets

Support tickets and admin workflow

| Column         | Type     | Constraints                  | Notes                            |
| -------------- | -------- | ---------------------------- | -------------------------------- |
| `id`           | Int      | Primary Key (auto-increment) |                                  |
| `ticketId`     | String   | Unique                       |                                  |
| `nationciteId` | String   | Required                     | Linked to user                   |
| `name`         | String   | Required                     | Ticket title                     |
| `type`         | String   | Required                     | Ticket category                  |
| `issueType`    | String   | Required                     | Specific issue classification    |
| `description`  | String   | Required                     | Details                          |
| `status`       | String   | Required                     | OPEN/IN_PROGRESS/RESOLVED/CLOSED |
| `createdAt`    | DateTime | Required                     |                                  |
| `updatedAt`    | DateTime | Required                     |                                  |

---

### TicketComments

Comments and updates on tickets

| Column        | Type     | Constraints                  | Notes                       |
| ------------- | -------- | ---------------------------- | --------------------------- |
| `id`          | Int      | Primary Key (auto-increment) |                             |
| `ticketId`    | String   | FK                           | References Tickets          |
| `comments`    | String   | Required                     | Comment text                |
| `attachments` | String   | Optional                     | File URLs (comma-separated) |
| `createdAt`   | DateTime | Required                     |                             |

---

## Publication Tables

### Publication

Publication records

| Column                | Type     | Constraints                  | Notes                     |
| --------------------- | -------- | ---------------------------- | ------------------------- |
| `id`                  | Int      | Primary Key (auto-increment) |                           |
| `title`               | String   | Required                     | Publication title         |
| `journalName`         | String   | Required                     | Journal name              |
| `datePublished`       | DateTime | Required                     | Publication date          |
| `citationsTotal`      | Int      | Required                     | Total citations           |
| `citationsLast5Years` | Int      | Required                     | Citations in last 5 years |
| `createdAt`           | DateTime | Default: now()               |                           |
| `updatedAt`           | DateTime | Auto-update                  |                           |

---

### PublicationScholar

Junction table for Publications and Scholars

| Column                | Type   | Constraints      | Notes                     |
| --------------------- | ------ | ---------------- | ------------------------- |
| `publicationId`       | Int    | FK & Primary Key | References Publication    |
| `scholarNationciteId` | String | FK & Primary Key | References ScholarsPublic |

---

### PublicationOrg

Junction table for Publications and Organizations

| Column            | Type   | Constraints      | Notes                  |
| ----------------- | ------ | ---------------- | ---------------------- |
| `publicationId`   | Int    | FK & Primary Key | References Publication |
| `orgNationciteId` | String | FK & Primary Key | References OrgsPublic  |

---

## Registration Required Fields Summary

### Medical Professional (14 required fields)

1. `name`
2. `medCouncilRegNo`
3. `stateCouncil`
4. `mobile`
5. `email`
6. `primaryHospital`
7. `specialty`
8. `researchFocus`
9. `status`
10. `plan`

**Optional Documents:**

- `medicalDegreeUrl`
- `regCertificateUrl`

---

### Researchers (11 required fields)

1. `name`
2. `institute`
3. `instituteEmail`
4. `orcidId`
5. `mobile`
6. `email`
7. `primaryDomain`
8. `googleScholarUrl`
9. `profilePhotoUrl`
10. `status`
11. `plan`

**Optional Documents:**

- `institutionalIdCardUrl`

---

### Organizations (9 required fields)

1. `domain`
2. `name`
3. `email`
4. `number`
5. `letterOfAuthorizationUrl`
6. `accreditationProofUrl`
7. `status`
8. `plan`

**Note:** No optional document fields - both authorization and accreditation proofs are required.
