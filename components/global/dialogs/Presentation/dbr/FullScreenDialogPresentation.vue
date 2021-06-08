<template>
  <v-dialog
    v-model="dialogHandler"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    class="full-screen-dialog"
  >
    <DialogToolbarPresentation @toggle-dialog="toggleDialog" @save="save"
      ><template #[`title`]>{{
        dialogTitle
      }}</template></DialogToolbarPresentation
    >
    <v-card>
      <!-- modal contents -->
      <slot name="contents" @handle-input="handleInput"></slot>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { DBRItem } from '~/datatypes/domains/clear/details'
import DialogToolbarPresentation from '~/components/global/dialogs/Presentation/dbr/elements/DialogToolbarPresentation.vue'

export default Vue.extend({
  components: {
    DialogToolbarPresentation,
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    dialogItem: {
      type: Object as PropType<DBRItem>,
      required: true,
    },
  },
  computed: {
    dialogHandler: {
      get(): boolean {
        return this.dialog
      },
      set(value: boolean) {
        this.$emit('toggle-dialog', { dialog: value })
      },
    },
    dialogTitle(): string {
      return `☆${this.dialogItem.level} ${this.dialogItem.title} (${this.dialogItem.difficulty})`
    },
  },
  methods: {
    toggleDialog() {
      const dialog = { dialog: false }

      this.$emit('toggle-dialog', dialog)
    },
    handleInput({ input }: { input: DBRItem }) {
      this.$logger.info('handleInput(P Parent): ', input)
    },
    save() {
      this.$emit('save')
    },
  },
})
</script>

<style scoped lang="scss">
.full-screen-dialog {
  z-index: $full-screen-dialog-z;
}
</style>
