import firebase from '~/plugins/firebase/firebase'
import 'firebase/auth'

export const auth = firebase.auth()

if (process.env.ENV === 'local') {
  auth.useEmulator('localhost:4000')
}
