<template>
  <v-row justify="space-between" class="full-width full-height my-auto">
    <v-col cols="1">
    </v-col>
    <v-col cols="5">
      <Users/>
    </v-col>

    <v-col>
      <Groups :selectedGroupIdPr="selectedGroupId"/>
    </v-col>
  </v-row>

</template>

<script>
import Users from '@/components/user/Users'
import Groups from "@/components/user/Groups";

export default {
  components: {
    Groups, Users
  },
  data() {
    return {
      selectedGroupId: null
    }
  },
  mounted() {
    if (!!this.$route.query) {
      this.selectedGroupId = this.$route.query.id
    }
  }
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/components/VToolbar/_variables.scss';

.full-width {
  max-width: inherit !important;
}

.full-height {
  height: calc(100vh - #{$toolbar-collapsed-max-width} * 1.5);
}
</style>
