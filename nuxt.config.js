import colors from 'vuetify/es5/util/colors'

const envPath = `.env.${process.env.ENV || 'local'}`
require('dotenv').config({ path: envPath })

// eslint-disable-next-line nuxt/no-cjs-in-config
const fs = require('fs')

// read json file here
// [todo] move other directory for common use
const iidx12Data = JSON.parse(
  fs.readFileSync('assets/json/iidx12.json', 'utf-8')
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
    iidx12Data,
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
    // https://firebase.nuxtjs.org/
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyD7ZlZy2QewMYgTVNTMeKLlLXE9wk-PnX4',
          authDomain: 'iidx-dp-op-database.firebaseapp.com',
          projectId: 'iidx-dp-op-database',
          storageBucket: 'iidx-dp-op-database.appspot.com',
          messagingSenderId: '736135449923',
          appId: '1:736135449923:web:dd0bd47e49b0676659f3f6',
          measurementId: 'G-2FL6PST6W1',
        },
        services: {
          firestore: {
            memoryOnly: false, // default
            chunkName:
              process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
            enablePersistence: true,
            emulatorPort: 8080,
            emulatorHost: 'localhost',
            settings: {
              // Firestore Settings - currently only works in SPA mode
            },
          },
          storage: true,
          analytics: {
            collectionEnabled: true, // default
          },
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedMutation: 'auth/ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
              subscribeManually: false,
            },
            ssr: false, // default
            emulatorPort: 9099,
            emulatorHost: 'http://localhost',
          },
        },
      },
    ],
    '@nuxtjs/sentry',
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

  sentry: {
    dsn:
      'https://6f102efa13d0468ba701072464b428aa@o329849.ingest.sentry.io/5741040', // Enter your project's DSN here
    // Additional Module Options go here
    // https://sentry.nuxtjs.org/sentry/options
    config: {
      // Add native Sentry config here
      // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
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
