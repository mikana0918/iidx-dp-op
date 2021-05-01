<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <!-- user auth state -->
      <template #prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <!-- left side menu -->
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
        <!-- login -->
        <login-button></login-button>
        <!-- logout -->
        <logout-button></logout-button>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>

    <!-- main view -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <!-- footer -->
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ copyright }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import loginButton from '~/components/global/auth/ui/login-button.vue'
import logoutButton from '~/components/global/auth/ui/logout-button.vue'
export default Vue.extend({
  components: {
    loginButton,
    logoutButton,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
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
    copyright(): string {
      return `${new Date().getFullYear()}  IIDX DP Options Database`
    },
  },
})
</script>
<style lang="scss" scoped>
.v-navigation-drawer {
  z-index: 1000000;
}
</style>
