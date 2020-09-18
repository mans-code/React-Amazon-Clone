import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "API_KEY_HERE",
  authDomain: "amozan-clone-e340e.firebaseapp.com",
  databaseURL: "https://amozan-clone-e340e.firebaseio.com",
  projectId: "amozan-clone-e340e",
  storageBucket: "amozan-clone-e340e.appspot.com",
  messagingSenderId: "160630375395",
  appId: "1:160630375395:web:ee09abd8d66249a04bd6d6",
  measurementId: "G-4Z3XY2YQC5",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
