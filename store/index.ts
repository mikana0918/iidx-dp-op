import { getAccessorType, actionTree } from 'typed-vuex'

// Import all your submodules
import * as level12 from '~/store/level12'
import * as auth from '~/store/auth'
import * as dbr from '~/store/dbr'

// Keep your existing vanilla Vuex code for state, getters, mutations, actions, plugins, etc.
export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = actionTree({ state, getters, mutations }, {})

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
    level12,
    auth,
    dbr,
  },
})
