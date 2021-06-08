<template>
  <div>
    <whole-screen-loader :is-loading="loading"></whole-screen-loader>
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
        :loading="loading"
        loading-text="データの取得に失敗しました。Failed to fetch data."
      >
        <!-- 1p/2p options -->
        <template #[`item.suggest`]="{ item }">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-chip class="ma-2" v-bind="attrs" v-on="on">
                {{ item.suggest }}
              </v-chip>
            </template>
            <span
              >- : No Option / M : MIRROR / R : RANDOM / RR : R-RANDOM / SR :
              S-RAN</span
            >
          </v-tooltip>
        </template>
        <!-- flip -->
        <template #[`item.flip`]="{ item }">
          <div v-show="item.flip === 'true'">
            <v-chip class="ma-2"> FLIP </v-chip>
          </div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import wholeScreenLoader from '~/components/global/loadings/whole-screen-loader.vue'
export default Vue.extend({
  components: { wholeScreenLoader },
  data() {
    return {
      search: '',
      loading: false,
      headers: [
        {
          text: '曲名(Title)',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: '1P/2P(Options)', value: 'suggest' },
        { text: 'FLIP', value: 'flip' },
      ],
    }
  },
  fetch() {
    this.$accessor.level12.getDPOptions()
  },
  computed: {
    dpOptionsData() {
      const op = this.$accessor.level12.dpOptionsData
      return op?.options
    },
  },
  created() {
    this.loading = true
  },
  mounted() {
    this.loading = false
  },
})
</script>

<style lang="scss" scoped>
.v-card__title {
  padding: unset !important;
}
.table-search {
  position: fixed;
  width: 84vw;
  padding: unset;
  z-index: $table-search-input-z;
}

.table-data {
  padding-top: 110px;
}
</style>
