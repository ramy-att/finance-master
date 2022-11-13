// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOeJauXZyUAUKrlDjsPit1WghL8gP_Ipg",
  authDomain: "financier-2022.firebaseapp.com",
  projectId: "financier-2022",
  storageBucket: "financier-2022.appspot.com",
  messagingSenderId: "601356440249",
  appId: "1:601356440249:web:d525ab382fcbc50b090168",
  measurementId: "G-SGKYFLCBZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);