<template>
  <v-container class="mx-auto">

    <v-row class="mx-auto">
        <v-col cols="12" class="mx-auto hidden-sm-and-down">
          <Stepper step="1"></Stepper>
        </v-col>
      <v-col cols="12"  lg="4" class="mx-auto">

        <v-card flat>
          <v-toolbar flat dark color="primary lighten-2">
            <v-icon>mdi-account</v-icon>
            <v-toolbar-title class="font-weight-light">Введите свои данные</v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pb-0">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="firstName" :rules="nameRules" label="Имя" outlined required/>
              <v-text-field v-model="lastName" :rules="nameRules" label="Фамилия" outlined required/>
              <v-text-field v-model="email" :rules="emailRule" label="Email" outlined required/>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn large :disabled="!valid" color="primary" block :dark="valid" @click="saveUser">Продолжить</v-btn>
          </v-card-actions>

          <v-card-text class="caption">Нажимая "Продолжить", вы соглашаетесь с тем, что в случае успешной фишинговой атаки нашим
            сервисом, с вашего баланса будет списана <strong>1000₽</strong>
          </v-card-text>

          <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom color="accent" left>
            Ура! Профиль создан. Осталось запустить тестрирование
          </v-snackbar>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Stepper from "@/components/user/Stepper";
import {mapMutations} from "vuex";

export default {
  components: {Stepper},
  layout: 'personal',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      hasSaved: false,
      valid: false,
      showLaunchButton: false,
      nameRules: [
        v => !!v || 'Обязательное поле',

      ],
      emailRule: [
        v => !!v || 'E-mail - обязательное поле',
        v => /.+@.+\..+/.test(v) || 'E-mail введен некорректно',
      ],
    }
  },
  watch: {
    hasSaved(value) {
      if (value === false) {
        this.$router.push(`/check/launch?id=${this.email}`)
      }
    }
  },
  methods: {
    ...mapMutations("users", ["STORE_USERS", "ADD_NEW_USER"]),
    validate() {
      this.$refs.form.validate()
    },
    async saveUser() {
      this.validate();
      if (this.valid) {
        this.hasSaved = true
        this.showLaunchButton = true;
        const user = await this.$axios.$post('/user', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          isFishingStarted: false,
          balance: '0'
        });
        this.ADD_NEW_USER(user);
        await this.$axios.$post(`/mail/registration/${this.email}?nickname=${this.firstName + ' ' + this.lastName}`);
      }
    },

  }
}
</script>

<style scoped>

</style>
