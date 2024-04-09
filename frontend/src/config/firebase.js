// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvBgLVLZBI21hsiF-CL2JqS3seieC5A2w",
  authDomain: "medu-dc976.firebaseapp.com",
  projectId: "medu-dc976",
  storageBucket: "medu-dc976.appspot.com",
  messagingSenderId: "530458759557",
  appId: "1:530458759557:web:7f3a7b4cb9aed6b2dfb4ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
