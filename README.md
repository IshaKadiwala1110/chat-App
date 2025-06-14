# Mini Firebase Chat App

A responsive, real-time chat app using Firebase Firestore and vanilla HTML/JavaScript.

## Features

- Real-time one-to-one messaging
- Automatically lists people who have chatted with you
- Responsive design (mobile and desktop)
- No login required — users enter their name
- Uses Firebase Firestore (no backend required)

## Getting Started

### 1. Clone or Download This Project

Simply save the `.html` file and `README.md` in a folder. You only need `index.html` to run the app.

## Firebase Setup Instructions

Follow these steps to make the chat functional:

### Step 1: Create a Firebase Project

1. Go to https://console.firebase.google.com/
2. Click on "Add project" → give it a name → click Continue
3. Disable Google Analytics (for simplicity) and finish setup

### Step 2: Add a Web App

1. In the Firebase dashboard, go to Project Settings
2. Under "Your Apps", click `</>` (Web App) and register your app (e.g., chatApp)
3. You'll get a Firebase config like this:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

Replace the `firebaseConfig` in your HTML file with your own values

### Step 3: Set Up Firestore Database

1. In Firebase Console → click Firestore Database
2. Click "Create Database"
3. Choose "Start in test mode"
4. Select a region and click Enable

### Step 4: Update Firestore Rules (optional for testing)

Go to Firestore > Rules, and use the following for development:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{docId} {
      allow read, write: if true;
    }
  }
}
```

Note: Make sure to change this in production

## Running the App

1. Double-click `index.html` to open in browser
2. Enter your name when prompted
3. You'll see people who've sent or received messages with you
4. Click `+` to start a new chat with someone

## Technologies Used

- HTML and CSS
- JavaScript 
- Firebase Firestore 

## Notes

- No backend or login required
- Only browser and Firebase setup needed
- Works best for learning or small-scale demos

## Feedback or Issues

Open an issue or message the developer directly.
