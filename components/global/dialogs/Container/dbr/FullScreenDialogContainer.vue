<template>
  <v-row justify="center">
    <FullScreenDialogPresentation
      :dialog="dialog"
      :dialog-item="dialogItem"
      @toggle-dialog="toggleDialog"
      @save="save"
    >
      <template #contents>
        <DialogInputPresentation
          :dialog-item="dialogItem"
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
import { DBRItem } from '~/datatypes/domains/clear/details'

interface DataTypes {
  input?: DBRItem
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
    dialogItem: {
      type: Object as PropType<DBRItem>,
      required: true,
    },
  },
  data(): DataTypes {
    return {
      input: {} as DBRItem,
    }
  },
  methods: {
    toggleDialog({ dialog }: { dialog: boolean }) {
      this.$logger.debug('toggle dialog on parent')

      this.$emit('toggle-dialog', { dialog })
    },
    handleInput({ input }: { input: DBRItem }) {
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
