<template>
  <div>
    <div class="container table-search">
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
    <div class="table-data">
      <v-data-table
        :headers="headers"
        :items="dpOptionsData"
        :items-per-page="30"
        class="elevation-1"
        :search="search"
        mobile-breakpoint="0"
        :fixed-header="true"
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
    await this.$accessor.level12.getDPOptionsData({
      firebaseRef: this.$fire.storage
        .ref()
        .child('option_config')
        .child('iidx12.json'),
    })
  },
  computed: {
    dpOptionsData() {
      const op = this.$accessor.level12.dpOptionsData
      return op?.options
    },
  },
})
</script>

<style scoped>
.v-card__title {
  padding: unset !important;
}
.table-search {
  position: fixed;
  width: 84vw;
  padding: unset;
  z-index: 999999;
}

.table-data {
  padding-top: 110px;
}
</style>
