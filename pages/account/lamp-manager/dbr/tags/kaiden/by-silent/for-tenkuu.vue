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
        <!-- clearRamp -->
        <template #[`item.clearRamp`]="{ item }">
          <div>{{ getClerRamp({ rm: item }) }}</div>
        </template>
        <!-- bp -->
        <template #[`item.bp`]="{ item }">
          {{ getBp({ rm: item }) }}
        </template>
        <!-- result -->
        <template #[`item.result`]="{ item }">
          {{ getResult({ rm: item }) }}
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
      :selected-dbr-item-master="selectedDbrItemMaster"
      :dialog-item-input="input"
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
import { cloneDeep } from '~/utils/object/cloneDeep'
import { defaultStateForCommand } from '~/datatypes/factory/dbr'

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
  input: DBRWriteModel
  selectedDbrItemMaster: DBRReadModel
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
      input: {} as DBRWriteModel,
      selectedDbrItemMaster: {} as DBRReadModel,
    }
  },
  fetch() {
    const uid: string = this.$accessor.auth.uid
    this.$accessor.dbr.readMasterDataForTenkuu()
    this.$accessor.dbr.getMyListForTenkuu({ uid })
  },
  computed: {
    dbrMaster(): DBRReadModel[] {
      const { succeeded, dbrMaster } = this.$accessor.dbr.dbrListMasterForKaiden

      return succeeded ? dbrMaster : []
    },
    myDbrList(): DBRWriteModel[] {
      const { succeeded, dbrItems } = this.$accessor.dbr.dbrListForKaiden
      if (!dbrItems) {
        return []
      }

      return succeeded ? cloneDeep({ obj: dbrItems }) : []
    },
  },
  watch: {
    input(newVal) {
      this.input = newVal
    },
  },
  created() {
    this.isWholeScreenLoading = true
  },
  mounted() {
    this.isWholeScreenLoading = false
  },
  methods: {
    editItem({ item }: { item: DBRReadModel }) {
      this.selectedDbrItemMaster = item
      const f: DBRWriteModel | undefined = this.myDbrList.find(
        (l) => l.masterId === item.id
      )

      this.input = f || defaultStateForCommand
      this.dialog = true
    },
    closeDialog() {
      this.selectedDbrItemMaster = {
        id: 0,
        level: 1,
        title: '',
        difficulty: 'Normal',
      }

      this.dialog = false
    },
    save({ input }: { input: DBRWriteModel }) {
      let storeData = this.myDbrList.map((l: DBRWriteModel) => {
        // update with new value
        if (l.masterId === input.masterId) {
          return input
        }

        return l
      })

      const hasInput = storeData.find((s) => s.masterId === input.masterId)
      if (!hasInput) {
        // insert new value
        storeData = [...storeData, input]
      }

      const uid = this.$accessor.auth.uid
      this.$accessor.dbr.updateMyListForTenkuu({
        uid,
        dbrData: storeData,
      })

      this.refetch({ uid })
      this.closeDialog()
    },
    refetch({ uid }: { uid: string }) {
      this.$accessor.dbr.getMyListForTenkuu({ uid })
    },
    getClerRamp({ rm }: { rm: DBRReadModel }) {
      const f = this.myDbrList.find((l) => {
        return l.masterId === rm.id
      })

      return f ? f.clearRamp : ''
    },
    getBp({ rm }: { rm: DBRReadModel }) {
      const f = this.myDbrList.find((l) => {
        return l.masterId === rm.id
      })

      return f ? f.bp : ''
    },
    getResult({ rm }: { rm: DBRReadModel }) {
      const f = this.myDbrList.find((l) => {
        return l.masterId === rm.id
      })

      return f ? f.result : ''
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
