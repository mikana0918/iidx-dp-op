import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyD7ZlZy2QewMYgTVNTMeKLlLXE9wk-PnX4',
    authDomain: 'iidx-dp-op-database.firebaseapp.com',
    projectId: 'iidx-dp-op-database',
    storageBucket: 'iidx-dp-op-database.appspot.com',
    messagingSenderId: '736135449923',
    appId: '1:736135449923:web:dd0bd47e49b0676659f3f6',
    measurementId: 'G-2FL6PST6W1',
  })
}

export default firebase
