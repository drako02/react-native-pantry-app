import { initializeApp } from 'firebase/app';
import { initializeAuth, Persistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import getReactNativeP

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    //firebase config here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export {app, db}
