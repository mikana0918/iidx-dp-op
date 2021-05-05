<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <template #prepend>
        <prepend-navigation-drawer
          :is-authenticated="isAuthenticated"
          :auth-user="authUser"
        ></prepend-navigation-drawer>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <template v-if="item.isCategory" style="text-align: center">{{
            item.title
          }}</template>
          <template v-else>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
      <!-- you can append some container here -->
      <!-- <template #append></template> -->
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ renderCopyright }}</span>
    </v-footer>

    <global-snackbar></global-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import PrependNavigationDrawer from '~/components/layouts/default/PrependNavigationDrawer.vue'
import GlobalSnackbar from '~/components/global/notification/snackbar/index.vue'
export default Vue.extend({
  components: {
    PrependNavigationDrawer,
    GlobalSnackbar,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Top',
          to: '/',
          isCategory: false,
        },
        {
          icon: 'mdi-apps',
          title: 'Options',
          isCategory: true,
        },
        {
          icon: 'mdi-star',
          title: 'Options/☆12',
          to: '/levels/12',
          isCategory: false,
        },
        {
          icon: 'mdi-apps',
          title: 'ClearLamp',
          isCategory: true,
        },
        // {
        //   icon: 'mdi-check',
        //   title: 'ClearLamp/DBM',
        //   to: '/account/lamp-manager/dbm',
        //   isCategory: false,
        // },
        {
          icon: 'mdi-check',
          title: 'ClearLamp/DBR',
          to: '/account/lamp-manager/dbr',
          isCategory: false,
        },
        {
          icon: 'mdi-apps',
          title: 'Links',
          isCategory: true,
        },
        {
          icon: 'mdi-link-variant',
          title: 'My ereter.net',
          to: '/account/links/ereter',
          isCategory: false,
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'IIDX DP Database / DPデータベース',
    }
  },
  computed: {
    renderCopyright(): string {
      return `${new Date().getFullYear()} IIDX DP Options Database`
    },
    authUser() {
      return this.$accessor.auth.authUserData
    },
    isAuthenticated(): boolean {
      return this.$accessor.auth.loggedIn
    },
  },
  mounted() {
    this.$accessor.auth.onAuthStateChanged()
  },
})
</script>
<style lang="scss" scoped>
.v-navigation-drawer {
  z-index: 1000000;
}
</style>
