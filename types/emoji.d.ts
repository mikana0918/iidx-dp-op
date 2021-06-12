import { emoji } from '~/config/emoji/index'

declare module 'vue/types/vue' {
  interface Vue {
    $emoji: typeof emoji
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $emoji: typeof emoji
  }
  interface Context {
    $emoji: typeof emoji
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $emoji: typeof emoji
  }
}
