<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact class="radius">

      <v-list-item-action class="mr-2">
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title class="caption" v-text="item.title"/>
      </v-list-item-content>

    </v-list-item>
  </v-list>
</template>

<script>
import {mdiHomeAutomation, mdiBullseye, mdiEmailPlus, mdiCogs} from '@mdi/js'

export default {
  data() {
    return {
      items: [
        {
          icon: mdiHomeAutomation,
          title: 'Главная',
          to: '/'
        },
        {
          icon: mdiEmailPlus,
          title: 'Кампании и шаблоны',
          to: '/admin'
        }
      ],
      errored: false
    };
  },
  methods: {}

}
</script>


<style scoped lang="scss">

</style>
