import firebase from '~/plugins/firebase/firebase'
import 'firebase/firestore'

export const firestore = firebase.firestore()

if (process.env.ENV === 'local') {
  firestore.useEmulator('localhost', 8080)
}
