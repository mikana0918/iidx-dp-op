<template>
  <v-dialog
    v-model="dialogHandler"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    class="full-screen-dialog"
  >
    <DialogToolbarPresentation @close-dialog="closeDialog" @save="save"
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
import {
  ReadModel as DBRReadModel,
  WriteModel as DBRWriteModel,
} from '~/datatypes/domains/clear/details'
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
    dialogItemInput: {
      type: Object as PropType<DBRWriteModel>,
      required: true,
    },
    selectedDbrItemMaster: {
      type: Object as PropType<DBRReadModel>,
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
      return `☆${this.selectedDbrItemMaster.level} ${this.selectedDbrItemMaster.title} (${this.selectedDbrItemMaster.difficulty})`
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog')
    },
    handleInput({ input }: { input: DBRWriteModel }) {
      this.$emit('handle-input', { input })
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
