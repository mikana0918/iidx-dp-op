import firebase from '~/plugins/firebase/firebase'
import 'firebase/auth'
import { logger } from '~/logging/index'

const auth = firebase.auth()

if (process.env.ENV === 'local') {
  auth.useEmulator('localhost:4000')
}

auth
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    // return firebase.auth().signInWithEmailAndPassword(email, password)
  })
  .catch((error) => {
    logger.error(`Firebase auth catched error ${error}`)
  })

export { auth }
