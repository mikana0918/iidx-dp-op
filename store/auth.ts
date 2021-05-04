import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import firebase from '~/plugins/firebase/firebase'

export const state = () => ({
  authUserData: undefined as
    | {
        succeeded: boolean
        displayName: string
        email: string
        photoURL: string
        emailVerified: boolean
        uid: string
      }
    | undefined,
})

export const getters = getterTree(state, {
  loggedIn(state): boolean {
    return !!state.authUserData?.uid
  },
  uid(state): string | undefined {
    return state.authUserData?.uid
  },
})

export const mutations = mutationTree(state, {
  SET_AUTH_USER_DATA_SUCCESS(state, { user }) {
    state.authUserData = {
      succeeded: true,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      uid: user.uid,
    }
  },
  SET_AUTH_USER_DATA_FAIL(state) {
    state.authUserData = {
      succeeded: false,
      displayName: '',
      email: '',
      photoURL: '',
      emailVerified: false,
      uid: '',
    }
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    googleSignInWithRedirect(this) {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    },
    signOut(this) {
      firebase.auth().signOut()
    },
    onAuthStateChanged(this, { commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit('SET_AUTH_USER_DATA_SUCCESS', {
            user,
          })
        } else {
          commit('SET_AUTH_USER_DATA_FAIL')
        }
      })
    },
  }
)
