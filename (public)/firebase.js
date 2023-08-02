// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApkKOMsz6I4gy5O6Y5VAnHt538qN9sJ3s",
  authDomain: "chatappaovivo.firebaseapp.com",
  projectId: "chatappaovivo",
  storageBucket: "chatappaovivo.appspot.com",
  messagingSenderId: "1050433533269",
  appId: "1:1050433533269:web:8079aaa95138fef059ebdc",
  measurementId: "G-RMCB2CS3RN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };