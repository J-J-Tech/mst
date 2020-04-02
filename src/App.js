/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import SignInUpFlip from './components/sign-in-up-flip/sign-in-up-flip.component';
import Navbar from './components/navbar/navbar.component';
import NewEntryForm from './components/entry-form/new-entry-form.component';
import EditEntryForm from './components/entry-form/edit-entry-form.component';
import Entries from './components/entries/entries.component';
import Entry from './components/entry/entry.component';


import { auth, createUserProfileDocument, firestore } from './firebase/firebase.utils';
import MstContext from './context/mst.context';

const App = () => {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true)
      const snapshot = await firestore.collection('entries')
        .where("userId", "==", user.id)
        .orderBy("date", "desc")
        .get();

      setEntries(snapshot.docs.map(doc => {
        let data = doc.data()
        return { ...data, id: doc.id }
      }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // get entries
  useEffect(() => {
    if (user) {
      fetchEntries()
    }
  }, [user]);



  const signUserOut = () => {
    auth.signOut();
    setUser(null);
  };

  let routes;

  if (user) {
    routes = (
      <Switch>
        <Route exact path='/'
          render={() => <NewEntryForm />}
        />
        <Route exact path='/new'
          render={() => <NewEntryForm />}
        />
        <Route exact path='/entries'
          render={() => <Entries />}
        />
        <Route exact path='/entry/:id'
          render={(props) => {
            let entry = entries.find(entry => entry.id === props.match.params.id)
            return <Entry entry={entry} />
          }
          }
        />
        <Route exact path='/edit/:id'
          render={() => <EditEntryForm />}
        />
      </Switch>
    )
  } else {
    routes = (
      <Route exact path='/signin'
        render={() => <SignInUpFlip />}
      />
    )
  }

  return (
    <div className="App">
      <MstContext.Provider value={{ user, entries, isLoading, fetchEntries, signUserOut }}>
        <Navbar />
        <main>
          {routes}
        </main>
      </MstContext.Provider>
    </div>
  );
}

export default App;
