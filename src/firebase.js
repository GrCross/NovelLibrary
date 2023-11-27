// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDU5KvolilD374Qhw_CwlxiKDem05_JCWw",
	authDomain: "novel-library-7c400.firebaseapp.com",
	projectId: "novel-library-7c400",
	storageBucket: "novel-library-7c400.appspot.com",
	messagingSenderId: "295630081061",
	appId: "1:295630081061:web:7bb09845d48032a55bc3cc",
	measurementId: "G-W0EN5YRCQH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
