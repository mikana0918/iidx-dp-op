import { Plugin, Context } from '@nuxt/types'
import { emoji } from '~/config/emoji'

const plugin: Plugin = (_context: Context, inject) => {
  inject('emoji', emoji)
}

export default plugin
