import colors from 'vuetify/es5/util/colors'
// eslint-disable-next-line nuxt/no-cjs-in-config
const fs = require('fs')

const envPath = `.env.${process.env.ENV || 'local'}`
require('dotenv').config({ path: envPath })

// read json file here
// [todo] move other directory for common use
const iidx12Data = JSON.parse(
  fs.readFileSync('assets/json/iidx12.json', 'utf-8')
)
const dbrListForKaiden = JSON.parse(
  fs.readFileSync('assets/json/dbr/silent-kaiden-list.json', 'utf-8')
)

export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'BeatmaniaIIDX DP Options API Database',
    title: 'IIDX DP Options（弐寺DPオプションデータベース）',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: {
    color: 'white',
    height: '1px',
  },

  env: {
    iidx12Data, // [todo] delete once list config json has been rremoved
    dbrListForKaiden, // [todo] delete once list config json has been rremoved
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://typed-vuex.roe.dev/
    'nuxt-typed-vuex',
    '@nuxtjs/proxy',
    [
      '@nuxtjs/dotenv',
      {
        filename: envPath,
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: process.env.WEB_ENDPOINT,
    // credentials: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  proxy: {},
}
