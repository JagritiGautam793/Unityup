# Unity Up - Community Issue Reporting Platform

## Overview

Unity Up is a modern mobile application built with React Native and Expo that empowers communities to report and track local issues. The platform facilitates better communication between community members and helps in organizing collective action for neighborhood improvement.

## Key Features

- **User Authentication**

  - Secure Google OAuth integration using Clerk
  - User profile management
  - Personalized user dashboard

- **Issue Reporting**

  - Image-based issue reporting
  - Category-based classification
  - Location verification and mapping
  - Detailed issue descriptions
  - Real-time status updates

- **Community Engagement**

  - Comment system on issues
  - Like and share functionality
  - Campaign creation and participation
  - Direct messaging between users

- **Content Management**
  - Category-wise issue filtering
  - Latest issues feed
  - My Issues section
  - Image upload and storage
  - Search functionality

## Technical Stack

### Frontend

- React Native
- Expo Framework
- NativeWind (TailwindCSS for React Native)
- React Navigation

### Backend & Services

- Firebase Firestore
- Firebase Storage
- Clerk Authentication
- Expo Location Services

### Key Libraries

- @clerk/clerk-expo: ^0.20.16
- @react-navigation/bottom-tabs: ^6.5.20
- @react-navigation/native: ^6.1.17
- @react-navigation/stack: ^6.3.29
- expo-image-picker: ~14.7.1
- expo-location: ~16.5.5
- firebase: ^10.14.1
- formik: ^2.4.5
- nativewind: ^2.0.11

## Project Structure

```
UnityUp/
├── Apps/
│   ├── Components/     # Reusable UI components
│   ├── Navigations/   # Navigation configuration
│   └── Screens/       # Main application screens
├── assets/            # Images and static assets
└── hooks/             # Custom React hooks
```

## Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/UnityUp.git
cd UnityUp
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

- Set up Firebase configuration
- Configure Clerk authentication
- Add necessary API keys

4. Start the development server

```bash
npm start
```

## App Screenshots

[Add screenshots of key features here]

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Made with ❤️ for better communities
