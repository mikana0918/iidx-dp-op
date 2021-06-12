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

          <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: ['auth/beforeAuth'],
  data: () => ({
    selected: [],
    items: [
      {
        // headline: 'IIDX ID',
        subtitle: `Change My IIDX ID.`,
        title: 'My IIDX ID',
        to: '/settings/account/iidxid',
      },
    ],
  }),
})
</script>

<style scoped></style>
