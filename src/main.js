import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDanNcpaDyQqzwyIvN6vrNmL87bMqzR5y0",
  authDomain: "job-manager-344a6.firebaseapp.com",
  projectId: "job-manager-344a6",
  storageBucket: "job-manager-344a6.appspot.com",
  messagingSenderId: "942281467783",
  appId: "1:942281467783:web:c211164d6a954177729522",
  measurementId: "G-KCWF0YMCMB"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router)
app.mount('#app')

