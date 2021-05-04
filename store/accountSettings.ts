import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  accountSettingDialog: undefined as
    | {
        shown: boolean
      }
    | undefined,
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  SHOW_ACCOUNT_SETTING_DIALOG(state) {
    state.accountSettingDialog = {
      shown: true,
    }
  },
  CLOSE_ACCOUNT_SETTING_DIALOG(state) {
    state.accountSettingDialog = {
      shown: false,
    }
  },
  TOGGLE_ACCOUNT_SETTING_DIALOG(state, { flg }: { flg: boolean }) {
    state.accountSettingDialog = {
      shown: flg,
    }
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    showAccountSettingDialog(this, { commit }) {
      commit('SHOW_ACCOUNT_SETTING_DIALOG')
    },
    closeAccountSettingDialog(this, { commit }) {
      commit('CLOSE_ACCOUNT_SETTING_DIALOG')
    },
    toggleAccountSettingDialog(this, { commit }, { flg }: { flg: boolean }) {
      commit('TOGGLE_ACCOUNT_SETTING_DIALOG', { flg })
    },
  }
)
