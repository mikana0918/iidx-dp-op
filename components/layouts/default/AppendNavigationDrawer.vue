<template>
  <div>
    <login-button-container
      :is-authenticated="isAuthenticated"
    ></login-button-container>
    <logout-button-container
      :is-authenticated="isAuthenticated"
    ></logout-button-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginButtonContainer from '~/components/auth/LoginButton/LoginButtonContainer.vue'
import LogoutButtonContainer from '~/components/auth/LogoutButton/LogoutButtonContainer.vue'
export default Vue.extend({
  components: {
    LoginButtonContainer,
    LogoutButtonContainer,
  },
  props: {
    isAuthenticated: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
})
</script>

<style></style>
