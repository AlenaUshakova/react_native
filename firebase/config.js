import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSuY5BJ9uX57OHx7TAuKL8Rkh6SSC81w8",
  authDomain: "my-nativ-project.firebaseapp.com",
  projectId: "my-nativ-project",
  storageBucket: "my-nativ-project.appspot.com",
  messagingSenderId: "334703575659",
  appId: "1:334703575659:web:c51275c709616bb3e3272e",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };