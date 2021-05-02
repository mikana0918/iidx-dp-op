<template>
  <v-card>
    <v-card-title>Sign in</v-card-title>
    <v-divider></v-divider>
    <v-container fill-height fluid>
      <v-row align="center" justify="center" @click="googleLogin">
        <!-- Sign in with Google  -->
        <img src="~/assets/icons/btn_google_signin_light_focus_web.png" />
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    showDialog(show: boolean) {
      this.$emit('show-dialog', show)
    },
    googleLogin() {
      this.$emit('google-login')
    },
  },
})
</script>

<style></style>
