<template>
  <v-card>
    <whole-screen-loader :is-loading="loading"></whole-screen-loader>
    <v-card-title class="headline font-weight-regular primary white--text">
      IIDX ID
    </v-card-title>
    <v-card-text>
      <v-subheader class="pa-0"> What is your IIDX ID? </v-subheader>
      <TextField
        :input="iidxIdInput"
        label="IIDX ID"
        :rules="rules"
        hide-detailes="auto"
        :disabled="onSaveComponentLoading"
        @input="mutateInput"
      ></TextField>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn
        class="ma-2"
        depressed
        color="primary"
        :loading="onSaveComponentLoading"
        :disabled="onSaveComponentLoading"
        @click="saveIIDXId()"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import wholeScreenLoader from '~/components/global/loadings/whole-screen-loader.vue'
import TextField from '~/components/base/input/text/TextField.vue'

interface DataTypes {
  rules: Array<boolean | string | Function>
  iidxIdInput: string
  loading: boolean
  onSaveComponentLoading: boolean
}

export default Vue.extend({
  components: { wholeScreenLoader, TextField },
  asyncData({ app }: Context) {
    const uid = app.$accessor.auth?.uid
    app.$accessor.firestore.findMyIIDXData({ uid })
  },
  data(): DataTypes {
    return {
      rules: [(value: string) => !!value || 'Required.'],
      iidxIdInput: '',
      loading: false, // loading on whole screen
      onSaveComponentLoading: false, // loading on component
    }
  },
  async fetch() {
    this.iidxIdInput = await this.$accessor.firestore.iidxId
  },
  computed: {
    iidxId(): string {
      return this.$accessor.firestore.iidxId
    },
    uid(): string {
      return this.$accessor.auth.uid
    },
    withoutStringDash(): string {
      return this.iidxIdInput.replace('-', '') // we don't store '-' of given IIDX ID.
    },
  },
  watch: {
    iidxId(newVal) {
      this.iidxIdInput = newVal
    },
  },
  created() {
    this.loading = true
  },
  mounted() {
    this.loading = false
  },
  methods: {
    saveIIDXId() {
      this.onSaveComponentLoading = true
      this.$accessor.firestore.setMyIIDXId({
        uid: this.uid,
        iidxId: this.withoutStringDash,
      })
      this.onSaveComponentLoading = false

      this.$accessor.snackbar.showWithNotification({ text: 'Save Success!' })
    },
    mutateInput({ input }: { input: string }) {
      this.iidxIdInput = input
    },
  },
})
</script>

<style scoped></style>
