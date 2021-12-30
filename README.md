# Mobile App for Suspected COVID-19 Case Management
## Objective
Submit suspected COVID-19 cases and collect their information and result, then storge these data into the cloud database. 
Medical staff can review cases and receive organized information.

## Getting Started
```
npm install
```
```
expo start
```

## Firebase setting
Create firebase.js in root
```javascript
// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
import 'firebase/compat/auth'
import 'firebase/compat/database'
import "firebase/compat/firestore"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "Your Key",
  authDomain: "Your Key",
  projectId: "Your Key",
  storageBucket: "Your Key",
  messagingSenderId: "Your Key",
  appId: "Your Key",
  measurementId: "Your Key"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
}else {
    app = firebase.app()
}
const auth = firebase.auth();
const rtdb = firebase.database();
const db = firebase.firestore();
export {auth, db, rtdb};
```
