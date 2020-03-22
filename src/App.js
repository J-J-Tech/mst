/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import SignInUpFlip from './components/sign-in-up-flip/sign-in-up-flip.component';
import Navbar from './components/navbar/navbar.component';
import NewEntryForm from './components/entry-form/new-entry-form.component';
import Entries from './components/entries/entries.component';
import Entry from './components/entry/entry.component';


import { auth, createUserProfileDocument, firestore } from './firebase/firebase.utils';
import MstContext from './context/mst.context';

const App = () => {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState(null);

  // Auth Listener
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

  const fetchEntries = async () => {
    try {
      const snapshot = await firestore.collection('entries')
        .where("userId", "==", user.id)
        .orderBy("date", "desc")
        .get();

      setEntries(snapshot.docs.map(doc => {
        let data = doc.data()
        return { ...data, id: doc.id }
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // get entries
  useEffect(() => {
    if (user) {
      console.log("fetching")
      fetchEntries()
    }
  }, [user]);



  const signUserOut = () => {
    auth.signOut();
    setUser(null);
  };

  console.log("ENTRIES", entries)

  return (
    <div className="App">
      <MstContext.Provider value={{ user, entries, fetchEntries }}>
        <Navbar signUserOut={signUserOut} />
        <Switch>
          <Route exact path='/signin'
            render={() => <SignInUpFlip />}
          />
          <Route exact path='/newentry'
            render={() => <NewEntryForm />}
          />
          <Route exact path='/entries'
            render={() => <Entries />}
          />
          <Route exact path='/entry/:id'
            render={(props) => {
              console.log('ENTRY ROUTE', entries)
              let entry = entries.find(entry => entry.id === props.match.params.id)
              return <Entry entry={entry} />
            }
            }
          />
        </Switch>
      </MstContext.Provider>
    </div>
  );
}

export default App;
