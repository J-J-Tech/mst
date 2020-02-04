import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyAnemNP2QtlOGHIpaP4wr1OkD28rs2a9nI",
    authDomain: "mst2020-12356.firebaseapp.com",
    databaseURL: "https://mst2020-12356.firebaseio.com",
    projectId: "mst2020-12356",
    storageBucket: "mst2020-12356.appspot.com",
    messagingSenderId: "506338225715",
    appId: "1:506338225715:web:c9acf4d54d85c069137d46",
    measurementId: "G-H29737J5J2"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`)
      const snapShot = await userRef.get();

      if (!snapShot.exists) {
          const {displayName, email} = userAuth;
          const createdAt = new Date();

          try {
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              })
          } catch (error) {
              console.log('error creating user', error.message);
          }
      } 
      return userRef;
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export default firebase;