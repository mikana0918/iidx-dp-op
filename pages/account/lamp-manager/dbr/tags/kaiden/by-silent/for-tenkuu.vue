<template>
  <div>
    <whole-screen-loader :is-loading="loading"></whole-screen-loader>
    <v-card elevation="2">
      <v-card-subtitle
        >What is this list? see:
        <nuxt-link to="http://0720silent.blog.fc2.com/blog-entry-9.html"
          >Silent's blog</nuxt-link
        ></v-card-subtitle
      >
    </v-card>
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
        <!-- level -->
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.level="{ item }">
          <div>☆{{ item.level }}</div>
        </template>
        <!-- title -->
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.title="{ item }">
          {{ item.title }}
          <span :class="item.difficulty.toLowerCase()"
            >({{ item.difficulty }})</span
          >
        </template>
        <!-- action -->
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
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
  middleware: ['authenticated'],
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
          class: 'level',
          cellClass: 'level-cell',
        },
        {
          text: 'Title',
          value: 'title',
          sortable: true,
          cellClass: 'title-cell',
        },
        {
          text: 'ClearLamp',
          align: 'start',
          sortable: true,
          value: 'clearRamp',
          class: 'clearlamp',
          cellClass: 'clearlamp-cell',
        },
        {
          text: 'B+P',
          value: 'B+P',
          sortable: true,
          class: 'bp',
          cellClass: 'bp-cell',
        },
        {
          text: 'Result',
          value: 'result',
          sortable: true,
          class: 'result',
          cellClass: 'result-cell',
        },
        {
          text: 'Action',
          value: 'actions',
          sortabel: false,
          class: 'actions',
          cellClass: 'actions-cell',
        },
      ],
    }
  },
  async fetch() {
    const uid: string = this.$accessor.auth.uid
    await this.$accessor.dbr.getMyDBRListForKaidenForTenkuu({ uid })

    if (!this.$accessor.dbr.dbrListForKaiden?.dbrList) {
      await this.$accessor.dbr.setDefaultMyDBRListForKaidenForTenkuu({ uid })
    }
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
