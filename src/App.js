import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import SignInUpFlip from './components/sign-in-up-flip/sign-in-up-flip.component';
import Navbar from './components/navbar/navbar.component';

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

  const signUserOut = () => {
    auth.signOut();
    setUser(null);
  };

  console.log("USER::", user)

  return (
    <div className="App">
      <Navbar signUserOut={signUserOut} />
      <Switch>
        <Route exact path='/signin'
          render={() => <SignInUpFlip />}
        />
        <Route exact path='/newentry'
          render={() => <h1>New Entry Form</h1>}
        />
      </Switch>
    </div>
  );
}

export default App;
