<template>
  <div>
    <whole-screen-loader :is-loading="loading"></whole-screen-loader>
    <p>IIDX ID: {{ this.iidxId }}</p>
    <a :href="ereterMyPageURL" target="_blank"
      >ereter.net(Click here if not opened)</a
    >
    <v-dialog v-model="dialog" max-width="70vw">
      <v-card>
        <v-card-title>Please register your IIDX ID</v-card-title>
        <v-divider></v-divider>
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-text-field v-model="iidxIdInput" :rules="rules"></v-text-field>
          </v-row>
        </v-container>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="saveIIDXId()"> Save </v-btn>
      </v-card-actions>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import wholeScreenLoader from '~/components/global/loadings/whole-screen-loader.vue'

export default Vue.extend({
  components: {
    wholeScreenLoader,
  },
  middleware: ['authenticated'],
  async asyncData({ app }: Context) {
    const uid = await app.$accessor.auth?.uid
    await app.$accessor.firestore.findMyIIDXData({ uid })
  },
  data() {
    return {
      dialog: false,
      loading: false,
      rules: [(value) => !!value || 'Required.'],
      iidxIdInput: '',
    }
  },
  computed: {
    iidxId(): string | undefined {
      return this.$accessor.firestore.iidxId
    },
    uid(): string | undefined {
      return this.$accessor.auth?.uid
    },
    ereterMyPageURL(): string {
      return `http://ereter.net/iidxplayerdata/${this.iidxId}`
    },
  },
  mounted() {
    if (this.iidxId) {
      window.open(this.ereterMyPageURL, '_blank')
    }
    if (!this.$accessor.firestore.iidx_data?.succeeded) {
      this.dialog = true
    }
  },
  methods: {
    saveIIDXId() {
      this.$accessor.firestore.setMyIIDXId({
        uid: this.uid,
        iidxId: this.iidxIdInput,
      })
    },
  },
})
</script>

<style scoped></style>
