<template>
  <v-row justify="center">
    <FullScreenDialogPresentation
      :dialog="dialog"
      :dialog-item-input="dialogItemInput"
      :selected-dbr-item-master="selectedDbrItemMaster"
      @close-dialog="closeDialog"
      @save="save"
    >
      <template #contents>
        <DialogInputPresentation
          :dialog-item-input="dialogItemInput"
          :selected-dbr-item-master="selectedDbrItemMaster"
          @input="syncInput"
        ></DialogInputPresentation>
      </template>
    </FullScreenDialogPresentation>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import FullScreenDialogPresentation from '~/components/global/dialogs/Presentation/dbr/FullScreenDialogPresentation.vue'
import DialogInputPresentation from '~/components/global/dialogs/Presentation/dbr/elements/DialogInputPresentation.vue'
import {
  ReadModel as DBRReadModel,
  WriteModel as DBRWriteModel,
} from '~/datatypes/domains/clear/details'

interface DataTypes {
  input: DBRWriteModel
}

export default Vue.extend({
  components: {
    FullScreenDialogPresentation,
    DialogInputPresentation,
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    selectedDbrItemMaster: {
      type: Object as PropType<DBRReadModel>,
      required: true,
    },
    dialogItemInput: {
      type: Object as PropType<DBRWriteModel>,
      required: true,
    },
  },
  data(): DataTypes {
    return {
      input: {} as DBRWriteModel,
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog')
    },
    syncInput({ input }: { input: DBRWriteModel }) {
      this.input = { ...this.input, ...input }
    },
    save() {
      this.$emit('save', { input: this.input })
    },
  },
})
</script>
