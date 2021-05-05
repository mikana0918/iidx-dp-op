import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  snackbar: undefined as
    | {
        shown: boolean
        text: string
      }
    | undefined,
})

export const getters = getterTree(state, {
  isShown(state): boolean {
    return state.snackbar?.shown ?? false
  },
  text(state): string {
    return state.snackbar?.text ?? ''
  },
})

export const mutations = mutationTree(state, {
  SHOW_SNACKBAR_WITH_NOTIFICATION(state, { text }) {
    state.snackbar = {
      shown: true,
      text,
    }
  },
  CLOSE_SNACKBAR(state) {
    state.snackbar = {
      shown: false,
      text: '',
    }
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    showWithNotification(this, { commit }, { text }: { text: string }) {
      commit('SHOW_SNACKBAR_WITH_NOTIFICATION', { text })
    },
    closeNotification(this, { commit }) {
      commit('CLOSE_SNACKBAR')
    },
  }
)
