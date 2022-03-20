import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage'

// Firestore config object
const firebaseConfig = {
  apiKey: "AIzaSyBO4E0hBD5E-YnkNH991NuAdpuJsfQ3S-A",
  authDomain: "vue-playlist-92640.firebaseapp.com",
  projectId: "vue-playlist-92640",
  storageBucket: "vue-playlist-92640.appspot.com",
  messagingSenderId: "862870966318",
  appId: "1:862870966318:web:7467f84c28667b78e50fbf"
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// Init auth services
const projectAuth = firebase.auth();

// Init firestore service
const projectFirestore = firebase.firestore();

// Init firestore storage service
const projectStorage = firebase.storage()

// Init timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp, projectAuth,projectStorage };
