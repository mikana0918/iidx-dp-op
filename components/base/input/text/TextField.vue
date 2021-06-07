<template>
  <v-text-field
    v-model="mutateInput"
    :label="label"
    :rules="rules"
    :hide-details="hideDetails"
    :disabled="disabled"
  >
  </v-text-field>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

/**
 * @see https://vuetifyjs.com/ja/api/v-text-field/#props
 */
export default Vue.extend({
  props: {
    input: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    rules: {
      type: Array as PropType<Array<boolean | string | Function>>,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: String as PropType<Boolean | String>,
      default: 'auto',
    },
  },
  computed: {
    mutateInput: {
      get(): string {
        return this.input
      },
      set(v: string) {
        this.$emit('mutate-input', v)
      },
    },
  },
})
</script>

<style scoped></style>
