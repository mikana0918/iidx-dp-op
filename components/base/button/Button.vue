<template>
  <v-btn
    :class="klass"
    :depressed="depressed"
    :color="color"
    :loading="loading"
    :disabled="disabled"
    :block="block"
    @click="handleClick"
  >
    <slot></slot>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

/**
 * @see https://vuetifyjs.com/ja/api/v-btn/#props
 */
export default Vue.extend({
  props: {
    klass: {
      type: String,
      default: '',
    },
    depressed: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
})
</script>

<style scoped></style>
