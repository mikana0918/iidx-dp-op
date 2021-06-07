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
  SET_MY_IIDX_DATA_SUCCESS(state, { iidxId }: { iidxId: string }) {
    state.iidx_data = {
      succeeded: true,
      iidxId,
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
    setMyIIDXId(
      this,
      { commit },
      { uid, iidxId }: { uid: string; iidxId: string }
    ) {
      firestore
        .collection('iidx_info')
        .doc(uid)
        .set({
          iidx_id: iidxId,
        })
        .then(() => {
          commit('SET_MY_IIDX_DATA_SUCCESS', {
            iidxId,
          })
        })
        .catch((error) => {
          this.$logger.error(`Error adding document: ${error}`)
          commit('SET_MY_IIDX_DATA_FAIL')
        })
    },
    findMyIIDXData(this, { commit }, { uid }: { uid: string }) {
      firestore
        .collection('iidx_info')
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.$logger.log(`Document data: ${doc.data()}`)
            commit('SET_MY_IIDX_DATA_SUCCESS', { iidxId: doc.data()?.iidx_id })
          } else {
            // doc.data() will be undefined in this case
            this.$logger.log(`No such document!`)
            commit('SET_MY_IIDX_DATA_FAIL')
          }
        })
        .catch((error) => {
          this.$logger.error(`Error getting document: ${error}`)
        })
    },
  }
)
