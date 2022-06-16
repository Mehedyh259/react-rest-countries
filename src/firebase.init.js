import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDGTahyoZ5AbdVUr_NP-dwClaK9QpHLRpg",
    authDomain: "rest-countries-a13f2.firebaseapp.com",
    projectId: "rest-countries-a13f2",
    storageBucket: "rest-countries-a13f2.appspot.com",
    messagingSenderId: "763000702113",
    appId: "1:763000702113:web:fa5399ba7e0a20b22f1ce0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default auth;