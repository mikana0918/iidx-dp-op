<template>
  <div>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="dpOptionsData"
      :items-per-page="20"
      class="elevation-1"
      :search="search"
    ></v-data-table>
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
        // { text: 'Fat (g)', value: 'fat' },
        // { text: 'Carbs (g)', value: 'carbs' },
        // { text: 'Protein (g)', value: 'protein' },
        // { text: 'Iron (%)', value: 'iron' },
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
