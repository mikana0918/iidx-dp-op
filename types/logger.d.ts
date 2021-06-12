import { logger } from '~/logging/index'

declare module 'vue/types/vue' {
  interface Vue {
    $logger: typeof logger
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $logger: typeof logger
  }
  interface Context {
    $logger: typeof logger
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $logger: typeof logger
  }
}
