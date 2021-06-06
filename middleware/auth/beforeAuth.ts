import { Context } from '@nuxt/types'

/**
 * This middleware hooks BEFORE the user client is not authenticated.
 */
export default ({ app, redirect }: Context) => {
  if (!app.$accessor.auth.loggedIn) {
    // eslint-disable-next-line no-console
    console.warn('before-auth: Fail! not authorized')
    // eslint-disable-next-line no-console
    console.log('redirect to signin')
    redirect('/auth/signin')
  } else {
    // eslint-disable-next-line no-console
    console.log('authenticated: Success! authorized')
  }
}
