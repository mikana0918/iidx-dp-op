<template>
  <logout-button-presentation
    v-show="isAuthenticated"
    @sign-out="signOut"
  ></logout-button-presentation>
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
      if (window.confirm('Logout? (confirm)')) {
        this.$accessor.auth.signOut()
      }
    },
  },
})
</script>

<style></style>
