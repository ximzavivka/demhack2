<template>
  <section>
    <v-card flat max-width="530">

      <v-card-title class="px-0 font-weight-bold">
        Список участников тестирования
        <v-spacer></v-spacer>
        <v-btn v-show="!showUserCreationForm" class="ml-4" fab dark small color="primary" @click="showUserCreationForm=true">
          <v-icon dark> {{ mdiPlus }}</v-icon>
        </v-btn>
        <!--        <v-btn disabled class="mx-2" fab small color="accent"><v-icon dark>{{ mdiDelete }}</v-icon></v-btn>-->
        <!--        <v-btn disabled class="mx-2" fab  small color="secondary"><v-icon dark>{{ mdiPen }}</v-icon></v-btn>-->
      </v-card-title>

      <v-data-table :headers="headers" :items="users" :items-per-page="5" class="elevation-1 font-weight-medium">
        <template #item.email="{ item }">
          <router-link :to="{path: `/dashboard/user/${item.email}` }">{{ item.email }}</router-link>
        </template>
      </v-data-table>
    </v-card>

    <UsersCreation v-if="showUserCreationForm"></UsersCreation>
    <v-btn outlined class="mr-4 mb-4" v-show="showUserCreationForm" @click="showUserCreationForm=false">
      Закрыть форму
    </v-btn>
  </section>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from "vuex";
import UsersCreation from "@/components/user/UsersCreation";
import {mdiDelete, mdiPlus, mdiPen} from '@mdi/js'

export default {
  components: {
    UsersCreation
  },
  data() {
    return {
      mdiDelete, mdiPlus, mdiPen,
      showUserCreationForm: false,
      limit: 5,
      offset: 0,
      headers: [
        {text: 'Имя', align: 'start', sortable: true, value: 'firstName'},
        {text: 'Фамилия', value: 'lastName', align: 'start', sortable: true},
        {text: 'Email', value: 'email', align: 'start', sortable: true},
      ],
    }
  },
  mounted() {
    this.usersList();
  },
  computed: {
    ...mapGetters("users", [
      "GET_USERS"
    ]),
    users: {
      get() {
        return this.GET_USERS;
      },
      set() {

      }
    }
  },
  methods: {
    ...mapMutations("users", [
      "STORE_USERS"
    ]),
    async usersList() {
      const pageParams = '';// `?limit=${this.limit}&offset=${this.offset}`
      const users = await this.$axios.$get(`/user${pageParams}`);

      if (this.$isNotEmptyArray(users)) {
        this.STORE_USERS(users);
      } else {
        console.log('Ничего не пришло в запросе юзеров')
      }
      return users;
    }
  }

}
</script>

<style scoped>

</style>
