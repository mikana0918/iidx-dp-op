<template>
  <v-dialog v-model="dialog" max-width="70vw">
    <template #activator="{ on }">
      <LoginButtonPresentation
        v-show="!isAuthenticated"
        v-on="on"
        @show-dialog="showDialog"
      ></LoginButtonPresentation>
    </template>
    <LoginModalPresentation
      @show-dialog="showDialog"
      @google-login="googleLogin"
    ></LoginModalPresentation>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginButtonPresentation from '~/components/auth/LoginButton/Presentation/LoginButtonPresentation.vue'
import LoginModalPresentation from '~/components/auth/LoginButton/Presentation/LoginModalPresentation.vue'
export default Vue.extend({
  components: { LoginButtonPresentation, LoginModalPresentation },
  props: {
    isAuthenticated: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    showDialog(show: boolean) {
      this.dialog = show
    },
    googleLogin() {
      this.$accessor.auth.googleSignInWithRedirect()
    },
  },
})
</script>
