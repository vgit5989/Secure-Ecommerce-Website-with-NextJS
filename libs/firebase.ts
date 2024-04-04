// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {};

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB3nQbfsDdZkS19L5mjOKmNlF5U8u3oC60",
  authDomain: "ecom-shop-10350.firebaseapp.com",
  projectId: "ecom-shop-10350",
  storageBucket: "ecom-shop-10350.appspot.com",
  messagingSenderId: "301590994809",
  appId: "1:301590994809:web:4b260477aaf6f51b7459a8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
