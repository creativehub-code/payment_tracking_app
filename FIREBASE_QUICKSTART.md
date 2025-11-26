# Firebase Quick Start Guide

This project now supports Firebase as a backend! Follow these steps to enable it.

## Prerequisites

1. A Firebase account ([sign up here](https://firebase.google.com/))
2. A Firebase project created in the [Firebase Console](https://console.firebase.google.com/)

## Step 1: Install Dependencies

Firebase SDK is already installed! ✅

## Step 2: Set Up Firebase Project

1. **Create Firestore Database:**
   - Go to Firebase Console > Firestore Database
   - Click "Create database"
   - Choose "Start in production mode" or "Start in test mode" (for development)
   - Select your region

2. **Enable Authentication:**
   - Go to Firebase Console > Authentication
   - Click "Get started"
   - Enable "Email/Password" sign-in method

3. **Get Configuration:**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps"
   - Click the web icon `</>` to add a web app
   - Copy your Firebase config

## Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Enable Firebase (set to "true" to use Firebase, "false" for localStorage)
NEXT_PUBLIC_USE_FIREBASE=true

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 4: Set Up Firestore Collections

The app will automatically create these collections when you start using it:
- `payments` - Stores all payment records
- `clients` - Stores client information
- `notifications` - Stores user notifications

## Step 5: Configure Security Rules (Important!)

Go to Firestore Database > Rules and use these rules:

**For Development (Less Secure):**
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

**For Production (More Secure):**
See `FIREBASE_SETUP.md` for detailed security rules.

## Step 6: Test the Integration

1. Start your dev server: `npm run dev`
2. The app will automatically use Firebase if `NEXT_PUBLIC_USE_FIREBASE=true`
3. Try creating a payment and check Firebase Console > Firestore to see it appear

## Current Status

✅ **Completed:**
- Firebase SDK installed
- Firebase configuration system
- Firestore service for payments
- Firestore service for clients  
- Firestore service for notifications
- Hybrid mode (supports both localStorage and Firebase)
- Real-time subscriptions

⚠️ **Still Using localStorage:**
- Authentication (auth-context.tsx)
- Client management (uses localStorage clients)

**Note:** The app currently defaults to localStorage. To enable Firebase:
1. Set `NEXT_PUBLIC_USE_FIREBASE=true` in `.env.local`
2. Add your Firebase configuration
3. The payments and data will then use Firestore

## Features

### Real-time Updates
When Firebase is enabled, the app uses Firestore real-time listeners for instant updates across all devices.

### Data Migration
- **From localStorage to Firebase:** Data stays in localStorage until you enable Firebase
- **From Firebase to localStorage:** Just set `NEXT_PUBLIC_USE_FIREBASE=false`

### Backward Compatibility
- All existing code continues to work
- Functions are async when Firebase is enabled
- Sync versions available for localStorage mode

## Troubleshooting

**"Firebase app not initialized"**
- Check your environment variables
- Make sure `.env.local` is in the project root
- Restart your dev server after changing `.env.local`

**"Missing or insufficient permissions"**
- Check your Firestore security rules
- Make sure rules allow read/write for your current setup

**Data not appearing in Firestore**
- Check browser console for errors
- Verify Firebase config is correct
- Check if `NEXT_PUBLIC_USE_FIREBASE=true`

## Next Steps

1. **Migrate Authentication:** Update `lib/auth-context.tsx` to use Firebase Auth (optional)
2. **Migrate Clients:** Update client management to use Firestore (currently uses localStorage)
3. **Set up Hosting:** Deploy to Firebase Hosting for free hosting
4. **Enable Storage:** Set up Firebase Storage for payment proof images

For detailed setup instructions, see `FIREBASE_SETUP.md`

