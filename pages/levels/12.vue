<template>
  <div class="container">
    <div style="position: fixed; width: 88%">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    </div>
    <div style="padding-top: 30%">
      <v-data-table
        :headers="headers"
        :items="dpOptionsData"
        items-per-page="20"
        class="elevation-1"
        :search="search"
        mobile-breakpoint="0"
        fixed-header="true"
      ></v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      search: '',
      headers: [
        {
          text: '曲名(Music Name)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'オプション(Options)', value: 'suggest' },
      ],
    }
  },
  async fetch() {
    await this.$accessor.level12.getDPOptionsData()
  },
  computed: {
    dpOptionsData() {
      const op = this.$accessor.level12.dpOptionsData
      return op?.options
    },
  },
})
</script>

<style></style>
