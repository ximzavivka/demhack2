<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row class="ml-n6">
        <v-col >
          <v-text-field
              v-model="currentGroup.name"
              :rules="nameRules"
              label="Название группы"
              required
          ></v-text-field>
        </v-col>
        <v-col >
          <v-autocomplete
              :items="allUsers"
              :filter="customFilter"
              item-text="email"
              label="Участники"
              multiple
              v-model="currentGroup.users"
          />
        </v-col>
<!--        <v-col >-->
<!--        </v-col>-->
      </v-row>
      <v-btn class="mt-6" :disabled="!valid" color="primary" :dark="valid" @click="saveGroup">Сохранить группу</v-btn>

    </v-form>
  </v-container>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {mdiHumanQueue} from '@mdi/js'

export default {
  props: {
    id: {
      type: [String, Number],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      mdiHumanQueue,
      currentGroup: {
        name: '',
        users: []
      },
      valid: false,
      nameRules: [
        v => !!v || 'Обязательное поле',

      ],

    }
  },
  watch: {
    id: {
      handler(newGroups, oldGroups) {
        this.$nextTick(function () {
          this.loadCurrentGroupData();
        })
      }
    }
  },
  mounted() {
    this.loadCurrentGroupData();
  },
  methods: {
    ...mapMutations("users", ["STORE_GROUPS"]),
    validate() {
      this.$refs.form.validate()
    },
    async loadCurrentGroupData() {
      console.log('loadCurrentGroupData id=')
      console.log(this.id);
      if (!!this.id) {
        this.currentGroup = await this.$axios.$get(`/group/${this.id}`)
      }
    },
    async saveGroup() {
      this.validate();
      console.log('SELECTED GROUP')
      console.log(this.currentGroup)
      if (this.valid) {
        let url = '/group';
        if (!!this.currentGroup.id) {
          url = url + '/' + this.currentGroup.id;
        }
        const group = await this.$axios.$post(url, {'name': this.currentGroup.name});
        await this.$axios.$put(`/user/group/${group.id}`, this.currentGroup.users);

        this.currentGroup = await this.$axios.$get(`/group`);
        await this.reloadGroups();
        this.currentGroup = {
          name: '',
          users: []
        };
      }
    },
    async reloadGroups() {
      const groups = await this.$axios.$get(`/group`);
      if (this.$isNotEmptyArray(groups)) {
        this.STORE_GROUPS(groups);
      } else {
        console.log('Ничего не пришло в запросе групп')
      }
      return groups;
    },
    customFilter(user, queryText, itemText) {
      const firstName = user.firstName.toLowerCase()
      const lastName = user.lastName.toLowerCase()
      const email = user.email.toLowerCase()
      const searchText = queryText.toLowerCase()
      return firstName.indexOf(searchText) > -1 || lastName.indexOf(searchText) > -1 ||
          email.indexOf(searchText) > -1
    },
  },
  computed: {
    ...mapGetters("users", ["GET_USERS", "GET_GROUPS"]),
    allUsers: {
      get() {
        return this.users = this.GET_USERS;
      },
      set() {
      }
    }
  }
}
</script>

<style scoped>

</style>
