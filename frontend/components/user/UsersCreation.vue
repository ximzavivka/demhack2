<template>
  <v-container>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
      <v-row class="ml-n6">
        <v-col cols="2">
          <v-text-field
              v-model="firstName"
              :rules="nameRules"
              label="Имя"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
              v-model="lastName"
              :rules="nameRules"
              label="Фамилия"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
              v-model="email"
              :rules="emailRule"
              label="Email"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn class="mt-6"
              :disabled="!valid"
              color="primary"
              :dark="valid"
              @click="saveUser">
            Сохранить
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      valid: false,
      nameRules: [
        v => !!v || 'Обязательное поле',

      ],

      emailRule: [
        v => !!v || 'E-mail - обязательное поле',
        v => /.+@.+\..+/.test(v) || 'E-mail введен некорректно',
      ],
    }
  },
  methods: {
    ...mapMutations("users", ["ADD_NEW_USER"]),
    validate() {
      this.$refs.form.validate()
    },
    async saveUser() {
      this.validate();
      if (this.valid) {
        const user = await this.$axios.$post('/user', {
          'firstName': this.firstName,
          'lastName': this.lastName,
          'email': this.email
        });
        this.ADD_NEW_USER(user);
      }
    }
  }
}
</script>

<style scoped>

</style>