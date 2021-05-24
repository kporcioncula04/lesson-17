import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCukHC3nUY3Vn-H1hkk8YSw7RW3G9Q72hc",
  authDomain: "crwn-clothing-db-a8379.firebaseapp.com",
  databaseURL: "https://crwn-clothing-db-a8379-default-rtdb.firebaseio.com",
  projectId: "crwn-clothing-db-a8379",
  storageBucket: "crwn-clothing-db-a8379.appspot.com",
  messagingSenderId: "94491010909",
  appId: "1:94491010909:web:3a6ebc647bd12b9445eab4",
  measurementId: "G-VN6VN8P45C"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
