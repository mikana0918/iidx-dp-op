import { Plugin, Context } from '@nuxt/types'
import { logger } from '~/logging/index'

const plugin: Plugin = (_context: Context, inject) => {
  inject('logger', logger)
}

export default plugin
