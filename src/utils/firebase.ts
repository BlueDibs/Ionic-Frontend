import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA72MKFKP4SE48uqNxEnFaXyIYByWFHkpk",
    authDomain: "projectsharib.firebaseapp.com",
    projectId: "projectsharib",
    storageBucket: "projectsharib.appspot.com",
    messagingSenderId: "477090342466",
    appId: "1:477090342466:web:434b07b6629cd01bacafdb",
    databaseURL: "https://projectsharib-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app)

export { app, auth, database }