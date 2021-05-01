import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  userData: undefined as
    | {
        succeeded: boolean
        uid: any
        email: any
        emailVerified: any
        displayName: any
        photoURL: any
      }
    | undefined,
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
    console.log('auth/mutation', authUser)
    console.log('auth/claims', claims)
    if (!authUser) {
      // claims = null
      // perform logout operations
      // Do this:
      const { uid, email, emailVerified, displayName, photoURL } = authUser
      state.userData = {
        succeeded: true,
        uid,
        email,
        emailVerified,
        displayName,
        photoURL,
      }
    } else {
      // Do something with the authUser and the claims object...
    }
  },
  SET_USER(state, { uid, email, emailVerified, displayName, photoURL }) {
    state.userData = {
      succeeded: true,
      uid,
      email,
      emailVerified,
      displayName,
      photoURL,
    }
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    onAuthStateChangedAction(this, { commit }, { authUser, claims }) {
      console.log('auth/action', authUser)
      console.log('auth/action', claims)
      if (!authUser) {
        // claims = null
        // Perform logout operations
      } else {
        // Do something with the authUser and the claims object...
        // you can request additional fields if they are optional (e.g. photoURL)
        const { uid, email, emailVerified, displayName, photoURL } = authUser
        commit('SET_USER', {
          uid,
          email,
          emailVerified,
          displayName,
          photoURL, // results in photoURL being undefined for server auth
          // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
          isAdmin: claims.custom_claim,
        })
      }
    },
    anonymousSignIn(this) {
      try {
        this.$fire.auth.signInAnonymously().then(() => {
          console.log('anonymous login succeeded')
        })
      } catch (e) {
        console.warn(e)
        this.$sentry.captureException(e)
      }
    },
    createUserWithEmailAndPassword(this, {}, { email, password }) {
      console.log(email, password)
      this.$fireModule
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log('user', user)
          // ...
        })
        .catch((e) => {
          console.warn(e)
          this.$sentry.captureException(e)
          // const errorCode = e.code
          // const errorMessage = e.message
          // ..
        })
    },
  }
)
