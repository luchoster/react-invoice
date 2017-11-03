import * as R   from 'ramda'
import Bluebird from 'bluebird'
import { notNil } from './helpers'
import firebase from 'firebase'

export const firebaseConfig = {
  apiKey: "AIzaSyAyMxj2jpR0nQeZ7VKNZmwMX-hVl6pfNsU",
  authDomain: "invoice-react.firebaseapp.com",
  databaseURL: "https://invoice-react.firebaseio.com",
  storageBucket: "invoice-react.appspot.com",
  messagingSenderId: "222508518983"
}

//the root app just in case we need it
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.database(); //the real-time database
export const auth = firebaseApp.auth(); //the firebase auth namespace

export const storageKey = 'KEY_FOR_LOCAL_STORAGE';

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}

export const onAuthStateChanged = () =>
  new Bluebird( (resolve, reject) =>
    firebase.auth().onAuthStateChanged(resolve)
  )

export const getCurrentUser = () =>
  onAuthStateChanged()

  .then(R.when(
    notNil,
    R.applySpec({
      uid: R.prop('uid'),
      name: R.prop('displayName'),
      email: R.prop('email'),
      email_verified: R.prop('emailVerified'),
      profile_image: R.prop('photoURL')
    })
  ))
