import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  dbrListForKaiden: undefined as
    | {
        succeeded: boolean
        dbrList: any
      }
    | undefined,
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
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    getDBRListForKaiden(this, { commit }) {
      try {
        commit('SET_DBR_LIST_DATA_SUCCESS', {
          data: process.env.dbrListForKaiden,
        })
      } catch (e) {
        console.warn(e)
        commit('SET_DBR_LIST_DATA_FAIL', e.response)
      }
    },
  }
)
