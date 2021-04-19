<template>
  <v-container>
    <v-row class="mx-auto">
      <v-col cols="6" class="mx-auto">
        <Stepper step="2"></Stepper>
      </v-col>
    </v-row>
    <v-row class="mx-auto">
      <v-col cols="6" class="mx-auto" style="text-align: center;">
        <v-card-text class="text-h5" style="width: 100%;    display: inline;    text-align: center; margin-bottom: -20px">К оплате: <b>1000₽</b>
        </v-card-text>
      </v-col>
    </v-row>
    <v-row class="mx-auto" style="margin-top: -20px;">
      <v-col cols="6" class="mx-auto">
        <CreditCard :userId="this.userId"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreditCard from '@/components/payment/CreditCard'
import Stepper from "@/components/user/Stepper";

export default {
  components: {CreditCard, Stepper},
  layout: 'personal',
  userId: '',
  created() {
    this.userId = this.$route.query.id;
  }
}
</script>

<style scoped>

</style>