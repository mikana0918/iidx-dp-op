import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { firestore } from '~/plugins/firebase/firestore'
import { DBRItem } from '~/datatypes/domains/clear/details'

interface DbrListForKaiden {
  succeeded: boolean
  dbrItems: Array<DBRItem>
}
interface InitialDataForKaidenTenkuu {
  succeeded: boolean
}

export const state = () => ({
  dbrListForKaiden: {} as DbrListForKaiden,
  initialDataForKaidenTenkuu: {} as InitialDataForKaidenTenkuu,
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  SET_DBR_LIST_DATA_SUCCESS(state, { data }: { data: Array<DBRItem> }) {
    state.dbrListForKaiden = {
      succeeded: true,
      dbrItems: data,
    }
  },
  SET_DBR_LIST_DATA_FAIL(state) {
    state.dbrListForKaiden = {
      succeeded: false,
      dbrItems: [],
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
     * 天空の夜明け(Tenkuu No Yoake) DBR Practice List
     * Get stored data.
     *
     * @param {Store} this
     * @param {Commit} commit
     * @param {uid} uid
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
            // eslint-disable-next-line no-console
            console.log('No such document! / dbr 皆伝:天空の夜明け ')
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error getting document:', error)
          commit('SET_DBR_LIST_DATA_FAIL')
        })
    },
    /**
     * 天空の夜明け(Tenkuu No Yoake) DBR Practice List
     * Store default list.
     *
     * @param {Store} this
     * @param { Commit } commit
     * @param { uid } uid
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
          // eslint-disable-next-line no-console
          console.error('Error adding document: ', error)
          commit('SET_INITIAL_DBR_DATA_FOR_KAIDEN_TENKUU_FAIL')
        })
    },
  }
)
