# Database Schema Diagram - SEOLOGY.AI

Visual representation of the database schema and relationships.

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER (Central Entity)                           │
│  - id (PK)                                                                   │
│  - clerkId (unique)                                                         │
│  - email (unique)                                                           │
│  - plan (STARTER/GROWTH/SCALE)                                              │
│  - role (USER/ADMIN)                                                        │
│  - executionMode (AUTOMATIC/PLAN/APPROVE)                                   │
└─────────────────────────────────────────────────────────────────────────────┘
         │
         │ 1:N
         ├──────────────────┬─────────────────┬──────────────────┬──────────────
         │                  │                 │                  │
         ▼                  ▼                 ▼                  ▼
┌──────────────┐   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ CONNECTION   │   │ SUBSCRIPTION │  │ NOTIFICATION │  │ AUDIT_LOG    │
│  (1:N)       │   │  (1:N)       │  │  (1:N)       │  │  (1:N)       │
├──────────────┤   ├──────────────┤  ├──────────────┤  ├──────────────┤
│ - platform   │   │ - plan       │  │ - type       │  │ - action     │
│ - domain     │   │ - status     │  │ - title      │  │ - resource   │
│ - status     │   │ - stripeId   │  │ - message    │  │ - details    │
│ - encrypted  │   │ - periods    │  │ - read       │  │ - ipAddress  │
└──────────────┘   └──────────────┘  └──────────────┘  └──────────────┘
         │
         │ 1:N
         ├──────────────────┬─────────────────┬──────────────────┬──────────────
         │                  │                 │                  │
         ▼                  ▼                 ▼                  ▼
┌──────────────┐   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ ISSUE        │   │ FIX          │  │ METRIC       │  │ CRAWL        │
│  (1:N)       │   │  (1:N)       │  │  (1:N)       │  │  (1:N)       │
├──────────────┤   ├──────────────┤  ├──────────────┤  ├──────────────┤
│ - type       │   │ - description│  │ - date       │  │ - status     │
│ - severity   │   │ - status     │  │ - traffic    │  │ - pagesFound │
│ - status     │   │ - changes    │  │ - rankings   │  │ - issuesFound│
│ - pageUrl    │   │ - beforeState│  │ - pageSpeed  │  │ - timestamps │
│ - details    │   │ - afterState │  │ - counts     │  │              │
└──────────────┘   └──────────────┘  └──────────────┘  └──────────────┘
         │                  │
         │ 1:N              │
         └──────────────────┘
                   │
                   ▼
         ┌──────────────┐
         │ FIX (Issue)  │
         │  Optional    │
         │  Relation    │
         └──────────────┘
```

## Schema Domains

### 1. User Management Domain

```
USER
  ├── id (uuid, PK)
  ├── clerkId (string, unique)
  ├── email (string, unique)
  ├── name (string?)
  ├── plan (enum: STARTER/GROWTH/SCALE)
  ├── role (enum: USER/ADMIN)
  ├── executionMode (enum: AUTOMATIC/PLAN/APPROVE)
  ├── stripeCustomerId (string?)
  ├── stripeSubscriptionId (string?)
  ├── createdAt (datetime)
  └── updatedAt (datetime)

SUBSCRIPTION
  ├── id (uuid, PK)
  ├── userId (uuid, FK → User)
  ├── stripeSubscriptionId (string, unique)
  ├── plan (enum)
  ├── status (enum: ACTIVE/CANCELLED/PAST_DUE/TRIALING)
  ├── currentPeriodStart (datetime)
  ├── currentPeriodEnd (datetime)
  └── createdAt (datetime)
```

### 2. Site Connection Domain

```
CONNECTION
  ├── id (uuid, PK)
  ├── userId (uuid, FK → User)
  ├── teamId (uuid?, FK → Team)
  ├── platform (enum: SHOPIFY/WORDPRESS/WIX/CUSTOM)
  ├── domain (string)
  ├── displayName (string?)
  ├── accessToken (string?, encrypted)
  ├── refreshToken (string?, encrypted)
  ├── credentials (string?, encrypted JSON)
  ├── status (enum: PENDING/CONNECTED/ERROR/DISCONNECTED)
  ├── lastSync (datetime?)
  ├── createdAt (datetime)
  └── updatedAt (datetime)

Indexes:
  - userId
  - teamId
  - status
```

### 3. SEO Management Domain

```
ISSUE
  ├── id (uuid, PK)
  ├── connectionId (uuid, FK → Connection)
  ├── type (string: 'missing_meta', 'broken_link', etc.)
  ├── title (string)
  ├── severity (enum: CRITICAL/HIGH/MEDIUM/LOW)
  ├── pageUrl (string)
  ├── details (string, JSON)
  ├── recommendation (string?, AI-generated)
  ├── status (enum: DETECTED/OPEN/IN_PROGRESS/FIXED/FAILED/IGNORED)
  ├── detectedAt (datetime)
  ├── fixedAt (datetime?)
  └── createdAt (datetime)

Indexes:
  - connectionId
  - status
  - severity

FIX
  ├── id (uuid, PK)
  ├── connectionId (uuid, FK → Connection)
  ├── issueId (uuid?, FK → Issue)
  ├── description (string)
  ├── type (string)
  ├── targetUrl (string?)
  ├── changes (string, JSON)
  ├── beforeState (string, JSON)
  ├── afterState (string, JSON)
  ├── method (enum: AUTOMATIC/MANUAL/PENDING)
  ├── status (enum: PENDING/APPLIED/ROLLED_BACK/FAILED)
  ├── appliedAt (datetime?)
  ├── rolledBackAt (datetime?)
  └── createdAt (datetime)

Indexes:
  - connectionId
  - issueId
  - status
```

### 4. Analytics Domain

```
METRIC
  ├── id (uuid, PK)
  ├── connectionId (uuid, FK → Connection)
  ├── date (datetime)
  ├── organicTraffic (int?)
  ├── rankings (string?, JSON: {keyword: position})
  ├── pageSpeed (float?)
  ├── issuesCount (int?)
  ├── fixesCount (int?)
  └── createdAt (datetime)

Unique: (connectionId, date)
Index: connectionId

CRAWL
  ├── id (uuid, PK)
  ├── connectionId (uuid, FK → Connection)
  ├── status (enum: PENDING/RUNNING/COMPLETED/FAILED)
  ├── pagesFound (int?)
  ├── issuesFound (int?)
  ├── startedAt (datetime?)
  ├── completedAt (datetime?)
  └── createdAt (datetime)

Indexes:
  - connectionId
  - status
```

### 5. AI & Collaboration Domain

```
AI_CONVERSATION
  ├── id (uuid, PK)
  ├── userId (uuid, FK → User)
  ├── connectionId (uuid?)
  ├── messages (string, JSON array)
  ├── context (string?, JSON)
  └── createdAt (datetime)

Index: userId

TEAM
  ├── id (uuid, PK)
  ├── name (string)
  ├── description (string?)
  ├── ownerId (uuid, FK → User)
  ├── plan (enum)
  ├── createdAt (datetime)
  └── updatedAt (datetime)

Index: ownerId

TEAM_MEMBER
  ├── id (uuid, PK)
  ├── teamId (uuid, FK → Team)
  ├── userId (uuid, FK → User)
  ├── role (enum: OWNER/ADMIN/MEMBER/VIEWER)
  └── joinedAt (datetime)

Unique: (teamId, userId)
Indexes: teamId, userId

TEAM_INVITATION
  ├── id (uuid, PK)
  ├── teamId (uuid, FK → Team)
  ├── email (string)
  ├── role (enum)
  ├── invitedBy (uuid, FK → User)
  ├── status (enum: PENDING/ACCEPTED/EXPIRED/REVOKED)
  ├── token (string, unique)
  ├── expiresAt (datetime)
  ├── acceptedAt (datetime?)
  └── createdAt (datetime)

Unique: (teamId, email)
Indexes: teamId, email, token
```

### 6. System & Security Domain

```
NOTIFICATION
  ├── id (uuid, PK)
  ├── userId (uuid, FK → User)
  ├── type (string: SUCCESS/ERROR/INFO/WARNING)
  ├── title (string)
  ├── message (string)
  ├── actionUrl (string?)
  ├── read (boolean)
  └── createdAt (datetime)

Indexes:
  - userId
  - read

AUDIT_LOG
  ├── id (uuid, PK)
  ├── userId (uuid, FK → User)
  ├── connectionId (uuid?)
  ├── action (string)
  ├── resource (string?)
  ├── resourceId (string?)
  ├── details (string, JSON)
  ├── ipAddress (string?)
  ├── userAgent (string?)
  └── createdAt (datetime)

Indexes:
  - userId
  - createdAt

WEBHOOK
  ├── id (uuid, PK)
  ├── userId (uuid, FK → User)
  ├── url (string)
  ├── events (string, JSON array)
  ├── secret (string, HMAC secret)
  ├── enabled (boolean)
  ├── failureCount (int)
  ├── lastTriggeredAt (datetime?)
  ├── createdAt (datetime)
  └── updatedAt (datetime)

Indexes:
  - userId
  - enabled

CSRF_TOKEN
  ├── id (uuid, PK)
  ├── userId (string)
  ├── token (string, unique)
  ├── provider (string: SHOPIFY/WORDPRESS/GOOGLE)
  ├── createdAt (datetime)
  └── expiresAt (datetime)

Indexes:
  - userId
  - token
  - expiresAt
```

## Relationship Summary

### Cascade Deletes

When a User is deleted:
- ✓ All Connections deleted
- ✓ All Subscriptions deleted
- ✓ All Notifications deleted
- ✓ Audit Logs retained (userId remains)

When a Connection is deleted:
- ✓ All Issues deleted
- ✓ All Fixes deleted
- ✓ All Metrics deleted
- ✓ All Crawls deleted

When a Team is deleted:
- ✓ All Team Members deleted
- ✓ All Team Invitations deleted
- ⚠ Connections set to NULL (teamId)

### Optional Relationships

- Fix → Issue (optional: fixes can exist without issues)
- Connection → Team (optional: connections can be user-only)
- AIConversation → Connection (optional: can be general conversation)

## Data Flow

```
User Creates Connection
    ↓
System Crawls Site (CRAWL)
    ↓
Issues Detected (ISSUE)
    ↓
AI Generates Recommendations
    ↓
User Chooses Execution Mode
    ↓
┌─────────────┬──────────────┬──────────────┐
│  AUTOMATIC  │     PLAN     │    APPROVE   │
└─────────────┴──────────────┴──────────────┘
      ↓              ↓              ↓
Apply All Fixes  Create Plan   Approve Each
      ↓              ↓              ↓
   FIX Created    FIX Created   FIX Created
      ↓              ↓              ↓
  Status=APPLIED Status=PENDING Status=PENDING
      ↓              ↓              ↓
  Issue=FIXED   Wait Approval  Wait Approval
      ↓              ↓              ↓
   METRIC       NOTIFICATION   NOTIFICATION
   Updated        Created        Created
      ↓              ↓              ↓
  AUDIT_LOG      AUDIT_LOG     AUDIT_LOG
```

## Key Statistics (from Seed Data)

- **Users**: 6 (1 admin, 5 regular)
- **Connections**: 10 (across Shopify, WordPress, Custom)
- **Issues**: 30-50 per connection (150-250 total)
- **Fixes**: 15-30 per connection (75-150 total)
- **Metrics**: 30 days × 10 connections = 300 records
- **Notifications**: 2-4 per user
- **Audit Logs**: 5-10 per user

## Storage Estimates

Based on average record sizes:

| Table          | Avg Size | 1K Users | 10K Users | 100K Users |
|----------------|----------|----------|-----------|------------|
| User           | 0.5 KB   | 0.5 MB   | 5 MB      | 50 MB      |
| Connection     | 1 KB     | 3 MB     | 30 MB     | 300 MB     |
| Issue          | 2 KB     | 30 MB    | 300 MB    | 3 GB       |
| Fix            | 3 KB     | 45 MB    | 450 MB    | 4.5 GB     |
| Metric         | 1 KB     | 90 MB    | 900 MB    | 9 GB       |
| Notification   | 0.5 KB   | 1.5 MB   | 15 MB     | 150 MB     |
| AuditLog       | 1 KB     | 10 MB    | 100 MB    | 1 GB       |
| **Total Est.** |          | ~180 MB  | ~1.8 GB   | ~18 GB     |

## Index Impact

All key indexes are in place for optimal query performance:

- User lookups: Indexed by clerkId, email
- Connection queries: Indexed by userId, status
- Issue filtering: Indexed by connectionId, status, severity
- Fix tracking: Indexed by connectionId, status
- Time-based queries: Indexed by createdAt
- Unique constraints: Prevent duplicates

## Security Features

1. **Encrypted Fields**: All sensitive credentials encrypted with AES-256-GCM
2. **Cascade Deletes**: Proper cleanup of related data
3. **Audit Trail**: All actions logged with IP and user agent
4. **CSRF Protection**: OAuth flow tokens with expiration
5. **User Isolation**: All queries filtered by userId
6. **Webhook Security**: HMAC signature verification

---

This schema is production-ready and optimized for the SEOLOGY.AI platform.
