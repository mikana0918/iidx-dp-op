<template>
  <div>
    <Button @clicked="setMasterDataForKaidenForTenkuu">
      Set Master Data for DBR kaiden for tennkuu
    </Button>
    <Button @clicked="setDefaultMyDBRListForKaidenForTenkuu">
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
    setMasterDataForKaidenForTenkuu() {
      this.$logger.info('called on component: setMasterDataForKaidenForTenkuu')
      this.$accessor.dbr.setMasterDataForKaidenForTenkuu()
      if (this.$accessor.dbr.initialDataForKaidenTenkuu.succeeded) {
        this.$accessor.snackbar.showWithNotification({
          text: `set master data for tenkuu sucess!`,
        })
      }
    },
    setDefaultMyDBRListForKaidenForTenkuu() {
      this.$logger.info(
        'called on component: setDefaultMyDBRListForKaidenForTenkuu'
      )
      const uid: string = this.$accessor.auth.uid
      this.$accessor.dbr.setDefaultMyDBRListForKaidenForTenkuu({ uid })
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
