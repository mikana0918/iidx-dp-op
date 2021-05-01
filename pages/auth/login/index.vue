<template>
  <div>
    <h2>ログイン</h2>
    <p>- ベーシック</p>
    <p @click="anonymousSignIn()">- ゲスト</p>
    <h2>サインアップ</h2>
    <h3>ID / パスワード</h3>
    <v-text-field v-model="idPasswordAuth.id" label="ID"></v-text-field>
    <v-text-field
      v-model="idPasswordAuth.password"
      label="Password"
    ></v-text-field>
    <v-btn elevation="2" @click="signUpWithEmailPassword()">登録</v-btn>
    <div></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      idPasswordAuth: {
        id: '',
        password: '',
      },
    }
  },
  methods: {
    async signUpWithEmailPassword() {
      try {
        await this.$$accessor.auth.createUserWithEmailAndPassword({
          email: this.idPasswordAuth.id,
          password: this.idPasswordAuth.password,
        })
      } catch (e) {
        console.warn(e)
        this.$sentry.captureException(e)
      }
    },
    async anonymousSignIn() {
      await this.$accessor.auth.anonymousSignIn()
      // try {
      //   await this.$fire.auth.signInAnonymously().then(() => {
      //     console.log('anonymous login succeeded')
      //   })
      // } catch (e) {
      //   console.warn(e)
      //   this.$sentry.captureException(e)
      // }
    },
  },
})
</script>

<style></style>
