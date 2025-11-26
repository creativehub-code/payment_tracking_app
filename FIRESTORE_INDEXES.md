# Firestore Index Setup Guide

## Required Indexes

Your app needs these composite indexes for Firestore queries. Follow the steps below to create them.

## Index 1: Payments by Client ID

**Collection:** `payments`
**Fields:**
- `clientId` (Ascending)
- `submittedAt` (Descending)

## Index 2: Payments by Status

**Collection:** `payments`
**Fields:**
- `status` (Ascending)
- `submittedAt` (Descending)

## Index 3: Payments by Client ID and Status

**Collection:** `payments`
**Fields:**
- `clientId` (Ascending)
- `status` (Ascending)
- `submittedAt` (Descending)

## Quick Setup Method

### Option 1: Click the Link in Error Message

When you see the error, it includes a link like:
```
https://console.firebase.google.com/v1/r/project/.../firestore/indexes?create_composite=...
```

**Just click that link** and Firebase will create the index automatically!

### Option 2: Manual Creation

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **tracking-app-6f5ea**
3. Click **Firestore Database** → **Indexes** tab
4. Click **Create Index**
5. For each index above:
   - Collection ID: `payments`
   - Add the fields in order
   - Set sort order (Ascending/Descending)
   - Click **Create**

### Option 3: Use Firebase CLI (Advanced)

If you have Firebase CLI installed, you can create a `firestore.indexes.json` file:

```json
{
  "indexes": [
    {
      "collectionGroup": "payments",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "clientId",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "submittedAt",
          "order": "DESCENDING"
        }
      ]
    },
    {
      "collectionGroup": "payments",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "status",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "submittedAt",
          "order": "DESCENDING"
        }
      ]
    },
    {
      "collectionGroup": "payments",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "clientId",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "status",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "submittedAt",
          "order": "DESCENDING"
        }
      ]
    }
  ],
  "fieldOverrides": []
}
```

Then run: `firebase deploy --only firestore:indexes`

## After Creating Indexes

1. **Wait 2-5 minutes** for indexes to build
2. Check the **Indexes** tab - they should show as "Enabled" when ready
3. Refresh your app - the error should be gone!

## Troubleshooting

- **Index still building?** Wait a few more minutes
- **Can't find the link?** Check browser console for the full error message
- **Multiple errors?** Create all indexes, then wait for them to build

