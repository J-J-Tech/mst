import React, { useState, useEffect } from 'react';
import './App.css';

import SignInUpFlip from './components/sign-in-up-flip/sign-in-up-flip.component';

import { auth, createUserProfileDocument, firestore } from './firebase/firebase.utils';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        const snapShot = await userRef.get()
        setUser(
          {
            id: snapShot.id,
            ...snapShot.data()
          }
        )
      }
    });
  }, []);


  return (
    <div className="App">
      <SignInUpFlip />
    </div>
  );
}

export default App;
