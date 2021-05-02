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
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template #append>
        <append-navigation-drawer
          :is-authenticated="isAuthenticated"
        ></append-navigation-drawer>
      </template>
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
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppendNavigationDrawer from '~/components/layouts/default/AppendNavigationDrawer.vue'
import PrependNavigationDrawer from '~/components/layouts/default/PrependNavigationDrawer.vue'
export default Vue.extend({
  components: {
    PrependNavigationDrawer,
    AppendNavigationDrawer,
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
        },
        {
          icon: 'mdi-star',
          title: 'Level 12',
          to: '/levels/12',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'IIDX DP Options Database / DPオプションデータベース',
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
