<template>
  <div v-if="isLoading" class="loader whole-screen">
    <v-progress-circular
      class="loader"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    isLoading: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.loader {
  position: fixed;
  z-index: 2000000;
}
.v-progress-circular {
  top: 50vh;
  left: 50vw;
}
.whole-screen {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #121212;
  z-index: 1000000;
}
</style>
