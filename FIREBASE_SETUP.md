# Firebase Setup Guide

This guide will help you set up Firebase as the backend for your payment tracking app.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter project name (e.g., "payment-tracking-app")
   - Enable Google Analytics (optional)
   - Create the project

## Step 2: Enable Firebase Services

### Enable Firestore Database
1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode** (or test mode for development)
4. Select a location closest to your users
5. Click "Enable"

### Enable Firebase Authentication
1. In Firebase Console, go to **Build** > **Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"

### Enable Firebase Storage (Optional - for payment proof images)
1. In Firebase Console, go to **Build** > **Storage**
2. Click "Get started"
3. Accept default security rules (you can customize later)
4. Select a location (same as Firestore for consistency)

## Step 3: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Go to **Project settings**
3. Scroll down to "Your apps" section
4. Click the web icon `</>` to add a web app
5. Register your app with a nickname (e.g., "Payment Tracker Web")
6. Copy the Firebase configuration object

## Step 4: Set Up Environment Variables

1. Create a `.env.local` file in your project root (copy from `.env.example` if it exists)
2. Add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the placeholder values with your actual Firebase config values.

## Step 5: Set Up Firestore Security Rules

1. In Firebase Console, go to **Build** > **Firestore Database** > **Rules**
2. Update the rules to secure your data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user is admin
    function isAdmin() {
      return isAuthenticated() && 
             resource.data.role == 'admin';
    }
    
    // Payments collection
    match /payments/{paymentId} {
      // Clients can read their own payments
      allow read: if isAuthenticated() && 
                     (request.auth.uid == resource.data.clientId || 
                      resource.data.clientId == get(/databases/$(database)/documents/clients/$(request.auth.uid)).data.email);
      // Only authenticated users can create payments
      allow create: if isAuthenticated();
      // Only admins can update/delete payments
      allow update, delete: if isAuthenticated() && 
                               get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Clients collection
    match /clients/{clientId} {
      // Admins can read all clients
      allow read: if isAuthenticated();
      // Only admins can create/update/delete clients
      allow write: if isAuthenticated() && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Notifications collection
    match /notifications/{notificationId} {
      // Users can only read their own notifications
      allow read: if isAuthenticated() && 
                     request.auth.uid == resource.data.userId;
      // Only system/admins can create notifications
      allow create: if isAuthenticated();
      // Users can update their own notifications
      allow update: if isAuthenticated() && 
                       request.auth.uid == resource.data.userId;
    }
  }
}
```

**Note:** For development, you can use simpler rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

⚠️ **Warning:** The simple rules above are for development only. Always use proper security rules in production!

## Step 6: Create Firestore Indexes

Firestore requires composite indexes for some queries. When you run queries that combine multiple filters, Firebase will show you the index creation URL in the console.

Common indexes you may need:
- `payments` collection: `clientId` (Ascending) + `submittedAt` (Descending)
- `payments` collection: `status` (Ascending) + `submittedAt` (Descending)
- `payments` collection: `clientId` (Ascending) + `status` (Ascending) + `submittedAt` (Descending)

## Step 7: Initialize Admin User (Optional)

You can create an admin user manually in Firestore or use the admin panel in the app:

1. Collection: `clients`
2. Document ID: Use Firebase Auth UID or custom ID
3. Fields:
   - `email`: admin@payment.com
   - `name`: Admin
   - `role`: admin
   - `targetAmount`: 0
   - `remainingAmount`: 0

## Step 8: Test the Connection

1. Start your development server: `npm run dev`
2. Try logging in and creating a payment
3. Check Firestore Console to see if data is being saved

## Troubleshooting

### "Missing or insufficient permissions"
- Check your Firestore security rules
- Verify the user is authenticated
- Check user roles/permissions

### "No index found"
- Click the link in the error message to create the required index
- Wait a few minutes for the index to build

### Environment variables not loading
- Make sure `.env.local` is in the project root
- Restart your development server after changing `.env.local`
- Variables must start with `NEXT_PUBLIC_` to be accessible in the browser

## Migration from localStorage

The app is designed to work with Firebase, but you may have existing data in localStorage. You can:
1. Export data from localStorage
2. Use Firebase Console to import data
3. Or create a migration script

## Next Steps

- Set up Firebase Hosting for deployment
- Configure custom domain
- Set up Firebase Functions for server-side operations (optional)
- Enable email verification in Authentication
- Set up Firebase Cloud Messaging for push notifications

