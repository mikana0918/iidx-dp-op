import { Context } from '@nuxt/types'

export default ({ app, redirect }: Context) => {
  if (!app.$accessor.auth.loggedIn) {
    console.warn('authenticated: Fail! not authorized')
    redirect('/auth/signin')
  } else {
    console.log('authenticated: Success! authorized')
  }
}
