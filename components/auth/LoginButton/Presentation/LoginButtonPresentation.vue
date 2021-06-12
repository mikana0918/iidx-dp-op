<template>
  <div class="pa-2">
    <Button block @click="showModal()"> Login </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '~/components/base/button/Button.vue'

export default Vue.extend({
  components: {
    Button,
  },
  methods: {
    showModal() {
      this.$emit('show-dialog', true)
    },
  },
})
</script>

<style></style>
