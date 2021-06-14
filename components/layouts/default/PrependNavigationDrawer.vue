<template>
  <div>
    <v-list-item v-if="isAuthenticated" two-line>
      <v-list-item-avatar>
        <img :src="authUser.photoURL" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ authUser.displayName }}</v-list-item-title>
        <v-list-item-subtitle>Logged In</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar style="cursor: pointer">
        <nuxt-link to="/settings/account" style="text-decoration: none">
          <v-icon mb2 right color="white"> mdi-cog-outline </v-icon>
        </nuxt-link>
      </v-list-item-avatar>
    </v-list-item>

    <Divider></Divider>

    <LoginButtonContainer
      :is-authenticated="isAuthenticated"
    ></LoginButtonContainer>
    <LogoutButtonContainer
      :is-authenticated="isAuthenticated"
    ></LogoutButtonContainer>

    <Divider></Divider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginButtonContainer from '~/components/auth/LoginButton/LoginButtonContainer.vue'
import LogoutButtonContainer from '~/components/auth/LogoutButton/LogoutButtonContainer.vue'
import Divider from '~/components/base/divider/Divider.vue'

export default Vue.extend({
  components: {
    LoginButtonContainer,
    LogoutButtonContainer,
    Divider,
  },
  props: {
    isAuthenticated: {
      type: Boolean,
      default: false,
      required: true,
    },
    authUser: {
      type: Object,
      default: undefined,
      required: false,
    },
  },
})
</script>

<style></style>
