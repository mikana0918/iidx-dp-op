<template>
  <section class="container">
    <div>
      <h1 class="title">nuxt-firebase-studies</h1>
      <h2 class="subtitle">
        Nuxt.jsとFirebaseを使って簡単なWebサービスを作るテストです。
      </h2>
      <div class="links">
        <button @click="googleLogin">googleでログイン</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    this.$accessor.auth.onAuthStateChanged()
  },
  methods: {
    googleLogin() {
      this.$accessor.auth.googleSignInWithRedirect()
    },
  },
})
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
