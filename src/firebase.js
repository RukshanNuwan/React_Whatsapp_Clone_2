import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCqlH8B07aiSs4faCcCqN98tqre0fn0Y7c",
  authDomain: "whatsapp-clone-2-476d8.firebaseapp.com",
  projectId: "whatsapp-clone-2-476d8",
  storageBucket: "whatsapp-clone-2-476d8.appspot.com",
  messagingSenderId: "76906040745",
  appId: "1:76906040745:web:bcd5ecd5c3755c51a108b8"
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export {db, auth, provider};
