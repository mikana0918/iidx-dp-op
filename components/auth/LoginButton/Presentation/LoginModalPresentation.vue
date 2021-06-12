<template>
  <Card>
    <v-card-title>Sign in</v-card-title>
    <Divider></Divider>
    <v-container fill-height fluid>
      <v-row align="center" justify="center" @click="googleLogin">
        <!-- Sign in with Google  -->
        <img src="~/assets/icons/btn_google_signin_light_focus_web.png" />
      </v-row>
    </v-container>
  </Card>
</template>

<script lang="ts">
import Vue from 'vue'
import Divider from '~/components/base/divider/Divider.vue'
import Card from '~/components/base/card/Card.vue'

export default Vue.extend({
  components: {
    Divider,
    Card,
  },
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
