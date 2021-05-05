import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { firestore } from '~/plugins/firebase/firestore'

export const state = () => ({
  iidx_data: undefined as
    | {
        succeeded: boolean
        iidxId: string | undefined
      }
    | undefined,
})

export const getters = getterTree(state, {
  iidxId(state): string {
    return state.iidx_data?.iidxId ?? ''
  },
})

export const mutations = mutationTree(state, {
  SET_MY_IIDX_DATA_SUCCESS(state, { data }) {
    state.iidx_data = {
      succeeded: true,
      iidxId: data.iidx_id,
    }
  },
  SET_MY_IIDX_DATA_FAIL(state) {
    state.iidx_data = {
      succeeded: false,
      iidxId: undefined,
    }
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    setMyIIDXId(this, {}, { uid, iidxId }: { uid: string; iidxId: string }) {
      firestore
        .collection('iidx_info')
        .doc(uid)
        .set({
          iidx_id: iidxId,
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    },
    findMyIIDXData(this, { commit }, { uid }: { uid: string }) {
      firestore
        .collection('iidx_info')
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data())
            commit('SET_MY_IIDX_DATA_SUCCESS', { data: doc.data() })
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
            commit('SET_MY_IIDX_DATA_FAIL')
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error)
        })
    },
  }
)
