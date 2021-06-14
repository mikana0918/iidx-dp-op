<template>
  <div>
    <v-list two-line>
      <v-list-item-group v-model="selected" active-class="primary">
        <template v-for="(item, index) in items">
          <nuxt-link :key="index" :to="item.to" style="text-decoration: none">
            <v-list-item :key="item.title">
              <template #default="{}">
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>

                  <!-- todo: may show user's iidx id here -->
                  <!-- <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                ></v-list-item-subtitle> -->

                  <v-list-item-subtitle
                    v-text="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon color="yellow darken-3"> mdi-arrow-right </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>
          </nuxt-link>

          <Divider v-if="index < items.length - 1" :key="index"></Divider>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Divider from '~/components/base/divider/Divider.vue'

export default Vue.extend({
  components: {
    Divider,
  },
  middleware: ['auth/beforeAuth'],
  data: () => ({
    selected: [],
    items: [
      {
        // headline: 'IIDX ID',
        subtitle: `皆伝対策DBRクリアランプマネジャー | Lamp manager for DP Kaiden practice.`,
        title: '皆伝 | Kaiden 😤',
        to: '/account/lamp-manager/dbr/tags/kaiden',
      },
    ],
  }),
})
</script>

<style scoped></style>
