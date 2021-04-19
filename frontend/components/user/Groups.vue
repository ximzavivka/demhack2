<template>
  <v-card flat>
    <v-card-title class="font-weight-bold ">
      Группы
      <v-btn v-show="!showGroupCreationForm" class="ml-4 mr-2" fab dark small color="primary" @click="showGroupCreationForm=true">
        <v-icon dark> {{ mdiPlus }}</v-icon>
      </v-btn>

      <v-btn v-show="!!selectedGroupId" class="mx-2" fab dark small color="accent" @click="deleteGroup">
        <v-icon dark>{{ mdiDelete }}</v-icon>
      </v-btn>
      <v-btn v-show="!showGroupEditingForm && !!selectedGroupId" class="mx-2" fab dark small color="secondary" @click="showGroupEditingForm=true">
        <v-icon dark>{{ mdiPen }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-treeview
        shaped
        activatable
        color="primary"
        :items="groups"
        selection-type="independent"
        selectable
        v-model="selectedGroups"
        @update:active="onUpdateThreeSelection"
    ></v-treeview>
    <GroupsCreation v-if="showGroupCreationForm"/>
    <v-btn
        outlined
        class="mr-4"
        v-show="showGroupCreationForm"
        @click="showGroupCreationForm=false">
      Закрыть форму
    </v-btn>
    <GroupsCreation v-if="showGroupEditingForm" :id="selectedGroupId[0]"></GroupsCreation>
    <v-btn text  class="mr-4" v-show="showGroupEditingForm" @click="showGroupEditingForm=false">Скрыть форму</v-btn>
  </v-card>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import GroupsCreation from "@/components/user/GroupsCreation";
import {mdiDelete, mdiPlus, mdiPen} from '@mdi/js'

export default {
  props: {
    selectedGroupIdPr: {
      type: String,
      required: false
    }
  },
  components: {
    GroupsCreation
  },
  data: () => ({
    mdiDelete, mdiPlus, mdiPen,
    allGroups: [],
    selectedGroups: [],
    selectedGroupId: '',
    showGroupEditingForm: false,
    showGroupCreationForm: false,
  }),
  watch: {
    groups: {
      handler(newGroups, oldGroups) {
        this.$nextTick(function () {
          if (this.$isNotEmptyArray(newGroups)) {
            const selection = !!this.selectedGroupId ? this.selectedGroupId : this.selectedGroupIdPr;
            for (const newGroup of newGroups) {
              if (!!newGroup.id && !!selection && newGroup.id.toString() === selection.toString()) {
                this.selectedGroups.push(newGroup.id)
                this.selectedGroupId = selection
              }
            }
          }
        })
      }
    }
  },
  computed: {
    ...mapGetters("users", [
      "GET_GROUPS"
    ]),
    groups: {
      get() {
        return this.convertGroupsToItems(this.GET_GROUPS);
      },
      set() {

      }
    },
    selectedGroup: {
      get() {
        const selection = !!this.selectedGroupId ? this.selectedGroupId : this.selectedGroupIdPr;
        this.selectedGroups.push(selection)
        return this.selectedGroups
      },
      set(newValues) {
        this.selectedGroups = newValues
      }
    }
  },
  created() {
    this.allGroups = this.groupsList();
  },

  methods: {
    ...mapMutations("users", [
      "STORE_GROUPS", "DELETE_GROUP"
    ]),
    onUpdateThreeSelection(selection) {
      console.log('[onUpdateThreeSelection]selection');
      console.log(selection)
      if (!!selection) {
        this.selectedGroupId = selection;
        this.selectedGroups = [];
        this.selectedGroups.push(selection)
      }
    },
    convertGroupsToItems(groups) {
      let items = [];
      for (const group of groups) {
        const users = group.users;
        let child = [];
        for (const user of users) {
          let lastName = !!user.lastName ? user.lastName : '';
          child.push({
            id: user.email,
            name: user.firstName + ' ' + lastName + ' (' + user.email + ')',
          })
        }
        items.push({
          id: group.id,
          name: group.name,
          children: child
        })
      }
      return items
    },
    async deleteGroup() {
      await this.$axios.$delete(`/group/${this.selectedGroupId}`);
      this.DELETE_GROUP(this.selectedGroupId);
    },
    async groupsList() {
      const groups = await this.$axios.$get(`/group`);
      if (this.$isNotEmptyArray(groups)) {
        this.STORE_GROUPS(groups);
      } else {
        console.log('Ничего не пришло в запросе групп')
      }
      return groups;
    }
  }
}
</script>

<style scoped lang="scss">

</style>
