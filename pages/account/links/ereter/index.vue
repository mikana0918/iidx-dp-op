<template>
  <div>
    <whole-screen-loader :is-loading="loading"></whole-screen-loader>
    <p v-if="iidxId">IIDX ID: {{ iidxId }}</p>
    <p v-else>You have no registered IIDX ID. Please go Settings.</p>
    <a v-show="iidxId" :href="ereterMyPageURL" target="_blank"
      >ereter.net(Click here if not opened)</a
    >
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
      loading: false,
      rules: [(value: string) => !!value || 'Required.'],
      iidxIdInput: '',
    }
  },
  computed: {
    iidxId(): string {
      return this.$accessor.firestore.iidxId
    },
    uid(): string {
      return this.$accessor.auth?.uid
    },
    ereterMyPageURL(): string {
      return `http://ereter.net/iidxplayerdata/${this.iidxId}`
    },
  },
  mounted() {
    this.redirectToSite()
    this.needToRegisterIidxId()
  },
  methods: {
    redirectToSite() {
      if (this.iidxId) {
        window.open(this.ereterMyPageURL, '_blank')
      }
    },
    needToRegisterIidxId() {
      if (
        !this.$accessor.firestore.iidx_data?.succeeded ||
        !this.$accessor.firestore.iidxId
      ) {
        this.$accessor.snackbar.showWithNotification({
          text: 'Please Register Your IIDX ID! (redirect in 3 sec)',
        })

        setTimeout(() => {
          this.$router.push({ path: '/settings/account/iidxid' })
        }, 3000)
      }
    },
  },
})
</script>

<style scoped></style>
