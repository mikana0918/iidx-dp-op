<template>
  <logout-button-presentation @sign-out="signOut"></logout-button-presentation>
</template>

<script>
import Vue from 'vue'
import LogoutButtonPresentation from '~/components/auth/LogoutButton/Presentation/LooutButtonPresentation'
export default Vue.extend({
  components: {
    LogoutButtonPresentation,
  },
  props: {
    isAuthenticated: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  methods: {
    signOut() {
      this.$accessor.auth.signOut()
    },
  },
})
</script>

<style></style>
