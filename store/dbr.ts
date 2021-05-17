import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { firestore } from '~/plugins/firebase/firestore'

export const state = () => ({
  dbrListForKaiden: undefined as
    | {
        succeeded: boolean
        dbrList: any
      }
    | undefined,
  initialDataForKaidenTenkuu: undefined as { succeeded: boolean } | undefined,
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  SET_DBR_LIST_DATA_SUCCESS(state, { data }: { data: any }) {
    state.dbrListForKaiden = {
      succeeded: true,
      dbrList: data,
    }
  },
  SET_DBR_LIST_DATA_FAIL(state) {
    state.dbrListForKaiden = {
      succeeded: false,
      dbrList: [],
    }
  },
  SET_INITIAL_DBR_DATA_FOR_KAIDEN_TENKUU_SUCCESS(state) {
    state.initialDataForKaidenTenkuu = {
      succeeded: true,
    }
  },
  SET_INITIAL_DBR_DATA_FOR_KAIDEN_TENKUU_FAIL(state) {
    state.initialDataForKaidenTenkuu = {
      succeeded: false,
    }
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    /**
     * 皆伝 - 天空の夜明け DBR Practice List
     * Get stored data.
     */
    getMyDBRListForKaidenForTenkuu(this, { commit }, { uid }: { uid: string }) {
      firestore
        .collection('dbr_list_for_kaiden_for_tenkuu')
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            commit('SET_DBR_LIST_DATA_SUCCESS', { data: doc.data()?.dbr_data })
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document! / dbr 皆伝:天空の夜明け ')
            // set default if user have no data.
            this.app.$accessor.dbr.setDefaultMyDBRListForKaidenForTenkuu({
              uid,
            })
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error)
          commit('SET_DBR_LIST_DATA_FAIL')
        })
    },
    /**
     * 皆伝 - 天空の夜明け DBR Practice List
     * Store default list.
     */
    setDefaultMyDBRListForKaidenForTenkuu(
      this,
      { commit },
      { uid }: { uid: string }
    ) {
      firestore
        .collection('dbr_list_for_kaiden_for_tenkuu')
        .doc(uid)
        .set({
          dbr_data: process.env.dbrListForKaiden,
        })
        .then(() => {
          commit('SET_INITIAL_DBR_DATA_FOR_KAIDEN_TENKUU_SUCCESS')
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
          commit('SET_INITIAL_DBR_DATA_FOR_KAIDEN_TENKUU_FAIL')
        })
    },
  }
)
