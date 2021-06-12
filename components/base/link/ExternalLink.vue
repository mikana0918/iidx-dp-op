<template>
  <a :href="href" :target="target">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

type TargetTypes = '_blank' | `_parent` | `_self` | `_top`

export default Vue.extend({
  props: {
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String as PropType<TargetTypes>,
      default: undefined,
    },
  },
})
</script>

<style scoped></style>
