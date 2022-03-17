import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Firestore config object
const firebaseConfig = {
  apiKey: "AIzaSyCKo1g1jaoxIEZ_FoIpFtwquu7Zj9nR2sM",
  authDomain: "vue-mymusic-list.firebaseapp.com",
  projectId: "vue-mymusic-list",
  storageBucket: "vue-mymusic-list.appspot.com",
  messagingSenderId: "904061668042",
  appId: "1:904061668042:web:93e20ddcb2caa8636f0233",
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// Init auth services
const projectAuth = firebase.auth();

// Init firestore service
const projectFirestore = firebase.firestore();

// Init timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp, projectAuth };
