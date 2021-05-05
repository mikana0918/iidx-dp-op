<template>
  <login-button-container
    :is-authenticated="isAuthenticated"
  ></login-button-container>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginButtonContainer from '~/components/auth/LoginButton/LoginButtonContainer.vue'
export default Vue.extend({
  components: {
    LoginButtonContainer,
  },
  computed: {
    isAuthenticated(): boolean {
      return this.$accessor.auth.loggedIn
    },
  },
})
</script>

<style></style>
