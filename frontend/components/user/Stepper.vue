<template>
  <v-stepper v-model="step" dense class="elevation-0 transparent">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="step > 1">Регистрация</v-stepper-step>
      <v-divider/>
      <v-stepper-step step="2" :complete="step > 2">Оплата участия в программе</v-stepper-step>
      <v-divider/>
      <v-stepper-step step="3" :complete="step >=3">Запуск</v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
export default {
  name: "Stepper",
  props: {
    step: {
      type: [String, Number],
      required: true,
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
