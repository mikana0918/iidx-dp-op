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
        :items="dbrList"
        :items-per-page="30"
        class="elevation-1"
        :search="search"
        mobile-breakpoint="0"
        :fixed-header="true"
        :loading="loading"
        loading-text="データの取得に失敗しました。Failed to fetch data."
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.level="{ item }"> ☆{{ item.level }} </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.title="{ item }">
          {{ item.title }}
          <span :class="item.difficulty.toLowerCase()"
            >({{ item.difficulty }})</span
          >
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import wholeScreenLoader from '~/components/global/loadings/whole-screen-loader.vue'
export default Vue.extend({
  components: { wholeScreenLoader },
  data() {
    return {
      loading: false,
      search: '',
      headers: [
        {
          text: '☆',
          align: 'start',
          sortable: true,
          value: 'level',
        },
        { text: 'Title', value: 'title' },
        { text: 'B+P', value: 'B+P' },
        { text: 'Clear lamp', value: 'clearLamp' },
        { text: 'Result', value: 'result' },
      ],
    }
  },
  async fetch() {
    await this.$accessor.dbr.getDBRListForKaiden()
  },
  computed: {
    dbrList() {
      const d = this.$accessor.dbr.dbrListForKaiden
      return d?.dbrList
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
  z-index: 999999;
}

.table-data {
  padding-top: 110px;
}

.another {
  color: #fba8c1;
}

.hyper {
  color: #efef51;
}
</style>
