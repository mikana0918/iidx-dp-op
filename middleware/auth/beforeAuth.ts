import { Context } from '@nuxt/types'

/**
 * This middleware hooks BEFORE the user client is not authenticated.
 */
export default ({ app, redirect }: Context) => {
  if (!app.$accessor.auth.loggedIn) {
    app.$logger.warn('😇😇😇 before-auth: Fail! not authorized')
    app.$logger.info('😅😅😅 redirect to signin')
    redirect('/auth/signin')
  } else {
    app.$logger.success('🎉🎉🎉 authenticated: Success! authorized')
  }
}
