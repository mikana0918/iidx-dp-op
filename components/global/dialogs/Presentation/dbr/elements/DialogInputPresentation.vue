<template>
  <div>
    <v-list three-line subheader>
      <v-subheader>Lamp Manager for DBR</v-subheader>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>ClearRamp</v-list-item-title>
          <v-radio-group v-model="input.clearRamp" @change="syncClearRamp">
            <v-radio
              v-for="(c, i) in clearRampsMaster"
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
import { WriteModel, ReadModel } from '~/datatypes/domains/clear/details'
// import { cloneDeep } from '~/utils/object/cloneDeep'

interface DataType {
  input: WriteModel
}

export default Vue.extend({
  components: { TextField, Divider },
  props: {
    dialogItemMaster: {
      type: Array as PropType<ReadModel[]>,
      required: true,
    },
    dialogItemInput: {
      type: Array as PropType<WriteModel[]>,
      required: true,
    },
  },
  data(): DataType {
    return {
      input: { clearRamp: 'NO PLAY' } as WriteModel,
    }
  },
  computed: {
    clearRampsMaster(): ClearRamp[] {
      return clearRamps
    },
  },
  watch: {
    // dialogItem(newVal: ReadModel): void {
    //   this.input = cloneDeep({ obj: newVal })
    // },
  },
  methods: {
    syncScore({ input }: { input: string }) {
      this.input.score = input

      this.$emit('input', { input: this.input })
    },
    syncBp({ input }: { input: string }) {
      this.input.bp = input

      this.$emit('input', { input: this.input })
    },
    syncClearRamp(input: ClearRamp) {
      this.input.clearRamp = input

      this.$emit('input', { input: this.input })
    },
  },
})
</script>

<style scoped></style>
