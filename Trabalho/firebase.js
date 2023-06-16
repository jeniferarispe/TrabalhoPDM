// Import the functions you need from the SDKs you need
//import * as firebase from "firebase
//import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// cada produto do firebase deve ser importad separadamente
//por exemplo auth de autenticação
import "firebase/compat/auth";

import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi0Qw4Ly0Tkpz2_hdJ_UL7_kSj_RHh1pA",

  authDomain: "exercicio1-2dff8.firebaseapp.com",

  projectId: "exercicio1-2dff8",

  storageBucket: "exercicio1-2dff8.appspot.com",

  messagingSenderId: "582811969758",

  appId: "1:582811969758:web:03cae2f8b6f9cab770ba4f",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
export { auth, firestore };
