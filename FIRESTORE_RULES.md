# Firestore Security Rules

## Quick Fix for Development

Go to Firebase Console → Firestore Database → Rules and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all read/write access for development
    // ⚠️ WARNING: Only use this for development/testing!
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

This allows all access until December 31, 2025. **Only use for development!**

## Production Security Rules
For production we recommend requiring Firebase Authentication and using a small set of server-side checks.

This repository includes a recommended rules file at `./firestore.rules` that:
- requires signed-in users for `payments` and `clients` access
- allows clients to create/read their own payments (`payments.clientId == request.auth.uid`)
- grants admin users (via a custom claim `admin:true`) broader privileges (read/update/delete)

Example highlights from `firestore.rules`:

- `allow create: if request.auth != null && request.resource.data.clientId == request.auth.uid` (payments)
- `allow read: if request.auth != null && (request.auth.token.admin == true || resource.data.clientId == request.auth.uid)`

This gives a secure baseline while allowing an administrator (with the `admin` custom claim) to manage data.

### Setting an admin user
You must set the `admin` custom claim for an admin account using the Firebase Admin SDK from a trusted environment (server or Cloud Function). Example (Node):

```js
const admin = require('firebase-admin')
// initialize admin SDK with service account
admin.auth().setCustomUserClaims(uid, { admin: true }).then(() => {
  console.log('Admin claim set for', uid)
})
```

### Deploying rules
Using the Firebase CLI (recommended):

```powershell
# Install the CLI if needed
npm install -g firebase-tools

# Login
firebase login

# From the project root, deploy only Firestore rules
firebase deploy --only firestore:rules
```

If you prefer to paste rules in the Firebase Console, open Firestore → Rules and paste the contents of `./firestore.rules`.

## How to Apply Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **tracking-app-6f5ea**
3. Click **Firestore Database** in the left menu
4. Click on the **Rules** tab
5. Paste one of the rule sets above
6. Click **Publish**

## Collections Used

- `payments` - Payment records
- `clients` - Client information
- `notifications` - User notifications

## Testing Rules

After updating rules, test by:
1. Creating a payment in your app
2. Checking Firestore Console to see if it appears
3. Verifying no permission errors in browser console

