<template>
  <div>
    <v-list three-line subheader>
      <v-subheader>Lamp Manager for DBR</v-subheader>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>ClearRamp</v-list-item-title>
          <v-radio-group v-model="radioGroup">
            <v-radio
              v-for="(c, i) in clearRamps"
              :key="i"
              :label="c"
              :value="c"
            ></v-radio>
          </v-radio-group>
        </v-list-item-content>
      </v-list-item>

      <Divider />

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>EX Score</v-list-item-title>
          <TextField
            :input="input.score"
            label="(e.x) 3890"
            @input="syncScore"
          ></TextField>
        </v-list-item-content>
      </v-list-item>

      <Divider />

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Bad + Poor count</v-list-item-title>
          <TextField
            :input="input.bp"
            label="(e.x) 23"
            @input="syncBp"
          ></TextField>
        </v-list-item-content>
      </v-list-item>

      <Divider />

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Result</v-list-item-title>
          <TextField label="Result"></TextField>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <Divider />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import TextField from '~/components/base/input/text/TextField.vue'
import Divider from '~/components/base/divider/Divider.vue'
import { clearRamps, ClearRamp } from '~/datatypes/domains/result/types'
import { DBRItem } from '~/datatypes/domains/clear/details'

interface DataType {
  radioGroup: ClearRamp
  input: DBRItem
}

export default Vue.extend({
  components: { TextField, Divider },
  props: {
    dialogItem: {
      type: Object as PropType<DBRItem>,
      required: true,
    },
  },
  data(): DataType {
    return {
      radioGroup: 'NO PLAY',
      input: { ...this.dialogItem } as DBRItem,
    }
  },
  computed: {
    clearRamps(): Array<ClearRamp> {
      return clearRamps
    },
  },
  watch: {
    dialogItem(newVal: DBRItem): void {
      this.input = newVal
    },
    radioGroup(newVal: ClearRamp): void {
      this.$logger.info(`sync clearRamp: ${newVal}`)
      this.input.clearRamp = newVal

      this.$emit('input', { input: this.input })
    },
  },
  methods: {
    syncScore({ input }: { input: string }) {
      this.$logger.info(`syncInput: ${input}`)
      this.input.score = input

      this.$emit('input', { input: this.input })
    },
    syncBp({ input }: { input: string }) {
      this.$logger.info(`syncBp: ${input}`)
      this.input.bp = input

      this.$emit('input', { input: this.input })
    },
  },
})
</script>

<style scoped></style>
