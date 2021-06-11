<template>
  <v-row justify="center">
    <FullScreenDialogPresentation
      :dialog="dialog"
      :dialog-item-master="dialogItemMaster"
      :dialog-item-input="dialogItemInput"
      @close-dialog="closeDialog"
      @save="save"
    >
      <template #contents>
        <DialogInputPresentation
          :dialog-item-master="dialogItemMaster"
          :dialog-item-input="dialogItemInput"
          @input="handleInput"
        ></DialogInputPresentation>
      </template>
    </FullScreenDialogPresentation>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import FullScreenDialogPresentation from '~/components/global/dialogs/Presentation/dbr/FullScreenDialogPresentation.vue'
import DialogInputPresentation from '~/components/global/dialogs/Presentation/dbr/elements/DialogInputPresentation.vue'
import { ReadModel as DBRReadModel } from '~/datatypes/domains/clear/details'
import { cloneDeep } from '~/utils/object/cloneDeep'

interface DataTypes {
  input?: DBRReadModel
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
    dialogItemMaster: {
      type: Array as PropType<DBRReadModel[]>,
      required: true,
    },
    dialogItemInput: {
      type: Array as PropType<DBRReadModel[]>,
      required: true,
    },
  },
  data(): DataTypes {
    return {
      input: {} as DBRReadModel,
    }
  },
  watch: {
    dialogItem(newVal: DBRReadModel): void {
      this.input = cloneDeep({ obj: newVal })
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog')
    },
    handleInput({ input }: { input: DBRReadModel }) {
      this.$logger.info('handleInput(PARENT): ', input)

      this.input = input
    },
    save() {
      this.$logger.info('save(PARENT): ', this.input)

      this.$emit('save', { input: this.input })
    },
  },
})
</script>
