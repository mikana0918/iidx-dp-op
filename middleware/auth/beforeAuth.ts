import { Context } from '@nuxt/types'

/**
 * This middleware hooks BEFORE the user client is not authenticated.
 */
export default ({ app, redirect }: Context) => {
  app.$accessor.auth.onAuthStateChanged()
  if (!app.$accessor.auth.loggedIn) {
    app.$logger.warn(
      `${app.$emoji.logging.halo} before-auth: Fail! not authorized`
    )
    app.$logger.info(`${app.$emoji.logging.sweat} redirect to signin`)
    redirect('/auth/signin')
  } else {
    app.$logger.success(
      `${app.$emoji.logging.tada} authenticated: Success! authorized`
    )
  }
}
