<template>
  <v-container>
    <whole-screen-loader :is-loading="loading"></whole-screen-loader>
    <v-row dense>
      <!-- TOP アイキャッチ -->
      <v-col cols="12">
        <v-card color="#818C80" dark>
          <v-card-title class="text-h5">
            IIDX DP データベースへようこそ!
          </v-card-title>
          <v-card-subtitle
            >ビートマニアIIDXのダブルプレイ向けオプションを非公式で纏めたファンサイトです。
          </v-card-subtitle>
        </v-card>
      </v-col>
      <!-- アップデート -->
      <v-col cols="12">
        <v-card color="rgb(31, 112, 135)" dark>
          <v-card-title class="text-h5"> アップデート</v-card-title>

          <v-card-subtitle
            >2021/04/27 | ☆12のオプションを追加しました<br />2021/04/26 |
            サイトを公開しました
          </v-card-subtitle>
          <!-- <v-card-actions> -->
          <!-- <v-btn text> ブックマーク </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
      <!-- 機能 1 / 3 -->
      <v-col cols="4">
        <v-card color="rgb(149, 33, 117)" dark>
          <v-card-title class="text-h5"> PWA対応 </v-card-title>

          <v-card-subtitle
            >スマホからHOME画面に追加でモバイル最適化されたページをどこでも。</v-card-subtitle
          >
          <!-- <v-card-actions>
            <v-btn text> ブックマーク </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
      <!-- 機能 2 / 3 -->
      <v-col cols="4">
        <v-card color="rgb(149, 33, 117)" dark>
          <v-card-title class="text-h5"> ゲーセンで使える </v-card-title>

          <v-card-subtitle
            >インクリメンタルサーチ /
            各種ソート機能を搭載。DPerに馴染むデザイン。</v-card-subtitle
          >
          <!-- <v-card-actions>
            <v-btn text> ブックマーク </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
      <!-- 機能 3 / 3 -->
      <v-col cols="4">
        <v-card color="rgb(149, 33, 117)" dark>
          <v-card-title class="text-h5"> 独自設定保存 </v-card-title>

          <v-card-subtitle
            >独自の設定保存機能を追加予定です(TBD)</v-card-subtitle
          >
          <!-- <v-card-actions>
            <v-btn text> ブックマーク </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import wholeScreenLoader from '~/components/global/loadings/whole-screen-loader.vue'
export default Vue.extend({
  components: { wholeScreenLoader },
  data() {
    return {
      loading: false,
    }
  },
  created() {
    this.loading = true
  },
  mounted() {
    this.loading = false
  },
})
</script>
