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
import {mdiHomeAutomation} from '@mdi/js'

export default {
  data() {
    return {
      items: [
        {
          icon: mdiHomeAutomation,
          title: 'Отчеты и статистика',
          to: '/dashboard/personal'
        },
      ],
      errored: false
    };
  },
  methods: {}

}
</script>


<style scoped lang="scss">

</style>
