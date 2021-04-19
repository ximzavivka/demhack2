<template>
  <v-container class="mx-auto">
    <v-row class="mx-auto">
      <v-col cols="6" class="mx-auto">
        <Stepper step="3"></Stepper>
      </v-col>
    </v-row>
    <v-row class="mx-auto">
      <v-col cols="6" class="mx-auto">
        <Profile></Profile>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Stepper from "@/components/user/Stepper";
import Profile from "@/components/user/Profile";

export default {
  name: "index",
  components: {Stepper, Profile},
  data() {
    return {
      userId: '',
      user: {}
    }
  },
}
</script>

<style scoped>

</style>