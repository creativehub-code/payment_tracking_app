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

For production, use these more secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Payments collection
    match /payments/{paymentId} {
      // Anyone can read payments (for now - adjust as needed)
      allow read: if true;
      // Anyone can create payments
      allow create: if true;
      // Only authenticated users can update/delete
      allow update, delete: if isAuthenticated();
    }
    
    // Clients collection
    match /clients/{clientId} {
      // Anyone can read clients
      allow read: if true;
      // Anyone can create clients (admin will manage this)
      allow create: if true;
      // Anyone can update/delete clients
      allow update, delete: if true;
    }
    
    // Notifications collection
    match /notifications/{notificationId} {
      // Users can read their own notifications
      allow read: if request.auth != null && 
                     request.auth.uid == resource.data.userId;
      // Anyone can create notifications
      allow create: if true;
      // Users can update their own notifications
      allow update: if request.auth != null && 
                       request.auth.uid == resource.data.userId;
      // Only authenticated users can delete
      allow delete: if isAuthenticated();
    }
  }
}
```

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

