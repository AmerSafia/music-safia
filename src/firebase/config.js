import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBh3JmMHDIVfpfU7W1FxB6g19eCToXFpQ0",
  authDomain: "music-safia.firebaseapp.com",
  projectId: "music-safia",
  storageBucket: "music-safia.appspot.com",
  messagingSenderId: "326913529819",
  appId: "1:326913529819:web:43e6ba410a3b596c2739fe",
};

// int firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// storge
const projectStorage = firebase.storage();
export { projectStorage, projectAuth, projectFirestore, timestamp };
