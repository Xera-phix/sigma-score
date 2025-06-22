# Firestore Setup Guide

## Overview
This guide will help you set up Firestore for the Sigma Score application, including deploying security rules and configuring the database.

## Prerequisites
1. Firebase CLI installed: `npm install -g firebase-tools`
2. Firebase project created and configured
3. Firestore database enabled in your Firebase console

## Setup Steps

### 1. Initialize Firebase (if not already done)
```bash
cd sigmascore
firebase login
firebase init
```

### 2. Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### 3. Deploy Firestore Indexes
```bash
firebase deploy --only firestore:indexes
```

### 4. Verify Setup
1. Go to your Firebase Console
2. Navigate to Firestore Database
3. Check that the rules are applied
4. Verify indexes are created

## Database Structure

### Collections

#### `users` Collection
- **Document ID**: User UID (from Firebase Auth)
- **Fields**:
  - `uid`: string (user ID)
  - `email`: string
  - `firstName`: string
  - `lastName`: string
  - `displayName`: string
  - `sigmaScore`: number (starts at 0)
  - `ranking`: number (starts at 0)
  - `totalScans`: number (starts at 0)
  - `createdAt`: timestamp
  - `lastLoginAt`: timestamp
  - `isActive`: boolean
  - `profileCompleted`: boolean

#### `scans` Collection
- **Document ID**: Auto-generated
- **Fields**:
  - `userId`: string (user ID)
  - `text`: string (analyzed text)
  - `sigmaScore`: number (score for this scan)
  - `timestamp`: timestamp
  - `analysis`: object
    - `sentiment`: string
    - `confidence`: number
    - `keywords`: array of strings

## Security Rules

The Firestore rules ensure:
- Users can only read/write their own data
- Leaderboard data is publicly readable
- Scan data is protected by user ownership
- Global stats are read-only for authenticated users

## Testing

1. Create a new user account
2. Verify user document is created in Firestore
3. Use the scanner to analyze text
4. Check that scan data is saved
5. Verify sigma score updates
6. Check leaderboard functionality

## Troubleshooting

### Common Issues

1. **Rules not deployed**: Make sure you're in the correct directory and Firebase project
2. **Permission denied**: Check that the user is authenticated and rules are properly deployed
3. **Index errors**: Wait for indexes to build or manually create them in Firebase Console

### Debug Commands
```bash
# Check Firebase project
firebase projects:list

# View current rules
firebase firestore:rules:get

# Test rules locally
firebase emulators:start --only firestore
```

## Next Steps

After setup, you can:
1. Customize the sigma score calculation algorithm
2. Add more user profile fields
3. Implement real-time leaderboard updates
4. Add admin functionality for managing users 