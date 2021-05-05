<template>
  <v-card>
    <whole-screen-loader :is-loading="loading"></whole-screen-loader>
    <v-card-title class="headline font-weight-regular primary white--text">
      IIDX ID
    </v-card-title>
    <v-card-text>
      <v-subheader class="pa-0"> What is your IIDX ID? </v-subheader>
      <v-text-field
        v-model="iidxIdInput"
        label="IIDX ID"
        :rules="rules"
        hide-details="auto"
        :disabled="onSaveComponentLoading"
      >
      </v-text-field>
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

export default Vue.extend({
  components: { wholeScreenLoader },
  async asyncData({ app }: Context) {
    const uid = await app.$accessor.auth?.uid
    await app.$accessor.firestore.findMyIIDXData({ uid })
  },
  data() {
    return {
      rules: [(value: any) => !!value || 'Required.'],
      iidxIdInput: '',
      loading: false, // loading on whole screen
      onSaveComponentLoading: false, // loading on component
    }
  },
  computed: {
    iidxId(): string {
      return this.$accessor.firestore.iidxId
    },
    uid(): string {
      return this.$accessor.auth.uid
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
        iidxId: this.iidxIdInput,
      })
      this.onSaveComponentLoading = false

      this.$accessor.snackbar.showWithNotification({ text: 'Save Success!' })
    },
  },
})
</script>

<style scoped></style>
