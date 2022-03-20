import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"
// Firestore config object
const firebaseConfig = {
  apiKey: "AIzaSyDp-YogMvWox_Nkiu0yc0c4vdEkixe_Q-I",
  authDomain: "vue-playlist-606fc.firebaseapp.com",
  projectId: "vue-playlist-606fc",
  storageBucket: "vue-playlist-606fc.appspot.com",
  messagingSenderId: "1074744334737",
  appId: "1:1074744334737:web:a5d8ebd9c1fb68fe4aa230"
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// Init auth services
const projectAuth = firebase.auth();

// Init firestore service
const projectFirestore = firebase.firestore();

const projectStorage = firebase.storage()

// Init timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp, projectAuth, projectStorage };
