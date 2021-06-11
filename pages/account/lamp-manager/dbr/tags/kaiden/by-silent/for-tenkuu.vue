<template>
  <div>
    <whole-screen-loader
      :is-loading="isWholeScreenLoading"
    ></whole-screen-loader>
    <v-card elevation="2">
      <v-card-subtitle
        >What is this list? see:
        <ExternalLink
          href="http://0720silent.blog.fc2.com/blog-entry-9.html"
          target="_blank"
          >Silent`s blog</ExternalLink
        >
      </v-card-subtitle>
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
        :items="dbrMaster"
        :items-per-page="30"
        class="elevation-1"
        :search="search"
        mobile-breakpoint="0"
        :fixed-header="true"
        :loading="isWholeScreenLoading"
        loading-text="データの取得に失敗しました。Failed to fetch data."
      >
        <!-- level -->
        <template #[`item.level`]="{ item }">
          <div>☆{{ item.level }}</div>
        </template>
        <!-- title -->
        <template #[`item.title`]="{ item }">
          {{ item.title }}
          <span :class="item.difficulty.toLowerCase()"
            >({{ item.difficulty }})</span
          >
        </template>
        <!-- bp -->
        <template #[`item.bp`]="{ item }">
          {{ item.bp }}
        </template>
        <!-- action -->
        <template #[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem({ item })">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </div>
    <FullScreenDialogContainer
      :dialog="dialog"
      :dialog-item-master="dbrMaster"
      :dialog-item-input="myDbrList"
      @save="save"
      @close-dialog="closeDialog"
    ></FullScreenDialogContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import wholeScreenLoader from '~/components/global/loadings/whole-screen-loader.vue'
import {
  WriteModel as DBRWriteModel,
  ReadModel as DBRReadModel,
} from '~/datatypes/domains/clear/details'
import ExternalLink from '~/components/base/link/ExternalLink.vue'
import FullScreenDialogContainer from '~/components/global/dialogs/Container/dbr/FullScreenDialogContainer.vue'
import { defaultStateForCommand } from '~/datatypes/factory/dbr'
// import { updateByTitle } from '~/utils/dbr/index'

interface DataTableTypes {
  text: string
  sortable: boolean
  align?: string
  value: string
  class?: string
  cellClass?: string
}

interface DataTypes {
  isWholeScreenLoading: boolean
  search: string
  readonly headers: Array<DataTableTypes>
  dialog: boolean
  readonly defaultDialogInput: DBRWriteModel
}

export default Vue.extend({
  components: { wholeScreenLoader, ExternalLink, FullScreenDialogContainer },
  middleware: ['auth/beforeAuth'],
  data(): DataTypes {
    return {
      isWholeScreenLoading: false,
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
          value: 'bp',
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
          sortable: false,
          class: 'actions',
          cellClass: 'actions-cell',
        },
      ],
      dialog: false,
      defaultDialogInput: defaultStateForCommand,
    }
  },
  fetch() {
    const uid: string = this.$accessor.auth.uid
    this.$accessor.dbr.readMasterDataForKaidenForTenkuu()
    this.$accessor.dbr.getMyDBRListForKaidenForTenkuu({ uid })
    // const uid: string = this.$accessor.auth.uid
    // this.$accessor.dbr.getMyDBRListForKaidenForTenkuu({ uid })
    // if (
    //   !this.$accessor.dbr.dbrListForKaiden?.dbrMaster && // not undefined
    //   !this.$accessor.dbr.dbrListForKaiden?.dbrMaster?.length // not empty array
    // ) {
    //   this.$accessor.dbr.setDefaultMyDBRListForKaidenForTenkuu({ uid }) // migrate firestore schema
    // }
  },
  computed: {
    dbrMaster(): DBRReadModel[] {
      const { succeeded, dbrMaster } = this.$accessor.dbr.dbrListMasterForKaiden

      return succeeded ? dbrMaster : []
    },
    myDbrList(): DBRWriteModel[] {
      const { succeeded, dbrItems } = this.$accessor.dbr.dbrListForKaiden

      return succeeded ? dbrItems : []
    },
  },
  watch: {},
  created() {
    this.isWholeScreenLoading = true
  },
  mounted() {
    this.isWholeScreenLoading = false
  },
  methods: {
    editItem({ item }: { item: DBRReadModel }) {
      this.$logger.info(`clicked: pages:`, item)

      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    save({ input }: { input: DBRWriteModel }) {
      this.$logger.info('save(PARENT: page): ', input)

      // const dbrData = updateByTitle({ list: this.dbrMaster, item: input })
      // const uid = this.$accessor.auth?.uid

      // this.$accessor.dbr.updateMyDBRListForKaidenForTenkuu({ uid, dbrData })
      // this.$accessor.dbr.getMyDBRListForKaidenForTenkuu({ uid })

      this.closeDialog()
    },
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

.another {
  color: #fba8c1;
}

.hyper {
  color: #efef51;
}
</style>
