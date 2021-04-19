<template>
  <v-card class="mx-auto" max-width="1000" tile>
    <!--    <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>-->
    <v-row style="margin:2.5%;position:absolute; top: 130px" class="mx-auto">
      <v-list-item>
        <v-list-item-avatar size="100">
          <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title" style="margin-top:20px;">{{ user.firstName }} {{ user.lastName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          <v-list-item-subtitle>Баланс {{ user.balance }} ₽</v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title" style="margin-top:20px;">Ура! Вы запустили свою первую фишинговую кампанию.
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-btn dark depressed color="accent" nuxt-link to="/dashboard/personal">Следить за результатами</v-btn>
      </v-list-item>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Profile",
  layout: 'personal',
  data() {
    return {
      user: {},
      userId: ''
    }
  },
  mounted() {
    this.user = this.loadUser();
  },
  methods: {
    async loadUser() {
      this.userId = this.$route.query.id;
      if (!!this.userId) {
        this.user = await this.$axios.$get(`/user/${this.userId}`)
      }
      return this.user;
    }
  }
}
</script>

<style scoped>

</style>