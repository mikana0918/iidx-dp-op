import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { firestore } from '~/plugins/firebase/firestore'
import { ReadModel, WriteModel } from '~/datatypes/domains/clear/details'

interface DbrListForKaiden {
  succeeded: boolean
  dbrItems: WriteModel[]
}

interface DbrListMasterForKaiden {
  succeeded: boolean
  dbrMaster: ReadModel[]
}
interface InitialDataForKaidenTenkuu {
  succeeded: boolean
}

const collection = 'dbr_list_for_kaiden_for_tenkuu'

export const state = () => ({
  dbrListForKaiden: {} as DbrListForKaiden,
  dbrListMasterForKaiden: {} as DbrListMasterForKaiden,
  initialDataForKaidenTenkuu: {} as InitialDataForKaidenTenkuu,
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  SET_DBR_LIST_DATA_SUCCESS(state, { data }: { data: WriteModel[] }) {
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
  SET_DBR_LIST_MASTER_DATA_SUCCESS(state, { data }: { data: ReadModel[] }) {
    state.dbrListMasterForKaiden = {
      succeeded: true,
      dbrMaster: data,
    }
  },
  SET_DBR_LIST_MASTER_DATA_FAIL(state) {
    state.dbrListMasterForKaiden = {
      succeeded: false,
      dbrMaster: [],
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
  UPDATE_MY_DBR_DATA_FOR_KAIDEN_TENKUU_SUCCESS(state) {
    state.initialDataForKaidenTenkuu = {
      succeeded: true,
    }
  },
  UPDATE_MY_DBR_DATA_FOR_KAIDEN_TENKUU_FAIL(state) {
    state.initialDataForKaidenTenkuu = {
      succeeded: false,
    }
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    /**
     * Set master data of 天空の夜明け(Tenkuu No Yoake) practice list.
     *
     * @todo This is an admin feature. Should be removed to admin store?
     * Or create admin repo?
     *
     * @param {Store} this
     * @param {Commit} { commit }
     */
    setMasterDataForTenkuu(this, { commit }) {
      firestore
        .collection(collection)
        .doc('master')
        .set({
          dbr_data: process.env.dbrListForKaidenMaster,
        })
        .then(() => {
          this.$logger.info(
            `${this.$emoji.logging.tada} Master data set for 天空の夜明け(Tenkuu No Yoake) practice list`
          )
          commit('SET_INITIAL_DBR_DATA_FOR_KAIDEN_TENKUU_SUCCESS')
        })
        .catch((error) => {
          this.$logger.error('Error adding document: ', error)
          commit('SET_INITIAL_DBR_DATA_FOR_KAIDEN_TENKUU_FAIL')
        })
    },
    /**
     * Set master data of 天空の夜明け(Tenkuu No Yoake) practice list.
     *
     * @param {Store} this
     * @param {Commit} { commit }
     */
    readMasterDataForTenkuu(this, { commit }) {
      firestore
        .collection(collection)
        .doc('master')
        .get()
        .then((doc) => {
          if (doc.exists) {
            commit('SET_DBR_LIST_MASTER_DATA_SUCCESS', {
              data: doc.data()?.dbr_data,
            })
          } else {
            this.$logger.warn(
              'No such document! / dbr 皆伝 天空の夜明け master data'
            )
          }
        })
        .catch((error) => {
          this.$logger.error('Error adding document: ', error)
          commit('SET_DBR_LIST_MASTER_DATA_FAIL')
        })
    },
    /**
     * 天空の夜明け(Tenkuu No Yoake) DBR Practice List
     * Get stored data.
     *
     * @param {Store} this
     * @param {Commit} commit
     * @param {uid} uid
     */
    getMyListForTenkuu(this, { commit }, { uid }: { uid: string }) {
      firestore
        .collection(collection)
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            commit('SET_DBR_LIST_DATA_SUCCESS', { data: doc.data()?.dbr_data })
          } else {
            this.$logger.warn(`${this.$emoji.logging.halo} No such document!`)
          }
        })
        .catch((error) => {
          this.$logger.error('Error getting document:', error)
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
    setDefaultMyListForTenkuu(this, { commit }, { uid }: { uid: string }) {
      firestore
        .collection(collection)
        .doc(uid)
        .set({
          dbr_data: process.env.dbrListForKaiden,
        })
        .then(() => {
          commit('SET_INITIAL_DBR_DATA_FOR_KAIDEN_TENKUU_SUCCESS')
        })
        .catch((error) => {
          this.$logger.error('Error adding document: ', error)
          commit('SET_INITIAL_DBR_DATA_FOR_KAIDEN_TENKUU_FAIL')
        })
    },
    /**
     * 天空の夜明け(Tenkuu No Yoake) DBR Practice List
     * Store user configured data by WriteModel.
     *
     * @param {Store} this
     * @param { Commit } commit
     * @param { uid } uid
     */
    updateMyListForTenkuu(
      this,
      { commit },
      { uid, dbrData }: { uid: string; dbrData: WriteModel[] }
    ) {
      firestore
        .collection(collection)
        .doc(uid)
        .set({
          dbr_data: dbrData,
        })
        .then(() => {
          commit('UPDATE_MY_DBR_DATA_FOR_KAIDEN_TENKUU_SUCCESS')
        })
        .catch((error) => {
          this.$logger.error('Error adding document: ', error)
          commit('UPDATE_MY_DBR_DATA_FOR_KAIDEN_TENKUU_FAIL')
        })
    },
  }
)
