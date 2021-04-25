import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { AxiosResponse } from 'axios'
import { DPOption } from '~/datatypes/level12/level12-types'

export const state = () => ({
  dpOptionsData: undefined as
    | {
        succeeded: boolean
        options: Array<DPOption>
      }
    | undefined,
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  SET_DP_OPTIONS_DATA_SUCCESS(state, { data }: { data: Array<DPOption> }) {
    console.log('mutation')
    console.log(data)
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
    async getDPOptionsData(this, { commit }) {
      const lTwelveDataUri: string =
        'https://raw.githubusercontent.com/tsniper1237/tsniper1237.github.io/master/iidx12.json'
      try {
        const res: AxiosResponse<Array<DPOption>> = await this.$axios.get(
          lTwelveDataUri
        )
        commit('SET_DP_OPTIONS_DATA_SUCCESS', { data: res.data })
      } catch (e) {
        console.warn(e)
        commit('SET_DP_OPTIONS_DATA_FAIL', e.response)
      }
    },
  }
)
