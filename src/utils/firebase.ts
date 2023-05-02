import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyA72MKFKP4SE48uqNxEnFaXyIYByWFHkpk",
    authDomain: "projectsharib.firebaseapp.com",
    projectId: "projectsharib",
    storageBucket: "projectsharib.appspot.com",
    messagingSenderId: "477090342466",
    appId: "1:477090342466:web:434b07b6629cd01bacafdb"
};

const app = initializeApp(firebaseConfig);
export { app }