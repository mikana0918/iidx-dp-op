<template>
  <div>
    <Button @click="setMasterDataForTenkuu">
      Set Master Data for DBR kaiden for tennkuu
    </Button>
    <Button @click="setDefaultMyListForTenkuu">
      set Default My DBRList For KaidenFor Tenkuu
    </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '~/components/base/button/Button.vue'

export default Vue.extend({
  components: { Button },
  // middleware: ['auth/onlyAdmin'],
  methods: {
    setMasterDataForTenkuu() {
      this.$accessor.dbr.setMasterDataForTenkuu()
      if (this.$accessor.dbr.initialDataForKaidenTenkuu.succeeded) {
        this.$accessor.snackbar.showWithNotification({
          text: `set master data for tenkuu sucess!`,
        })
      }
    },
    setDefaultMyListForTenkuu() {
      const uid: string = this.$accessor.auth.uid
      this.$accessor.dbr.setDefaultMyListForTenkuu({ uid })
      if (this.$accessor.dbr.initialDataForKaidenTenkuu.succeeded) {
        this.$accessor.snackbar.showWithNotification({
          text: `set master data for tenkuu sucess!`,
        })
      }
    },
  },
})
</script>

<style scoped></style>
