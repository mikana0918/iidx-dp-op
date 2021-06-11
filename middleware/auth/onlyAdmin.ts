import { Context } from '@nuxt/types'

export default ({ app, redirect }: Context) => {
  const isAdm = app.$accessor.auth.isAdmin
  app.$logger.info(`isAdmin: ${isAdm}`)

  if (!app.$accessor.auth.isAdmin) {
    const onFailMsg = `${app.$emoji.logging.police} You are not allowed to open admin page. If you need admin authority, contact the site admin.`

    app.$logger.warn(onFailMsg)
    app.$accessor.snackbar.showWithNotification({
      text: onFailMsg,
    })

    redirect('/')
  } else if (app.$accessor.auth.isAdmin) {
    const onSucessMsg = `${app.$emoji.logging.tada} Admin Login Success!`

    app.$logger.success(onSucessMsg)
    app.$accessor.snackbar.showWithNotification({
      text: onSucessMsg,
    })
  }
}
