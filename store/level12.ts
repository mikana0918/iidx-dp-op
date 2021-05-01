import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  dpOptionsData: undefined as
    | {
        succeeded: boolean
        options: any
      }
    | undefined,
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  SET_DP_OPTIONS_DATA_SUCCESS(state, { data }: { data: any }) {
    state.dpOptionsData = {
      succeeded: true,
      options: data,
    }
  },
  SET_DP_OPTIONS_DATA_FAIL(state) {
    state.dpOptionsData = {
      succeeded: false,
      options: [],
    }
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    getDPOptionsData(this, { commit }) {
      try {
        commit('SET_DP_OPTIONS_DATA_SUCCESS', { data: process.env.iidx12Data })
      } catch (e) {
        console.warn(e)
        commit('SET_DP_OPTIONS_DATA_FAIL', e.response)
      }
    },
  }
)
