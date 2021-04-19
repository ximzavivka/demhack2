<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col>
          <v-card flat
                  class="my-4"
                  max-width="500">
            <v-card-title>Групповые кампании
              <v-btn
                  class="ml-4 mr-2" fab color="grey" small outlined @click="goToCampaignCreation">
                <v-icon dark> {{ mdiPlus }}</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <CampaignCardsList :isPersonal="false"></CampaignCardsList>
        </v-col>
      </v-row>

    </v-container>
  </v-container>

</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {mdiDelete, mdiPlus, mdiPen} from '@mdi/js'
import CampaignCardsList from "@/components/campaign/CampaignCardsList";

export default {
  components: {CampaignCardsList},
  data() {
    return {
      mdiDelete, mdiPlus, mdiPen,
      // headers: [
      //   {text: 'Название', value: 'name', align: 'name', sortable: true},
      //   {text: 'Статус', value: 'status', align: 'start', sortable: true},
      //   {text: 'Шаблон письма', value: 'template', align: 'start', sortable: false},
      //   // {text: 'Настройки SMTP', value: 'smtp', align: 'start', sortable: false},
      //   {text: 'Группа', value: 'group', align: 'start', sortable: true},
      //   {text: 'Фишинговая страница', value: 'landingPage', align: 'start', sortable: false},
      // ]
    }
  },
  // computed: {
  //   ...mapGetters("campaign", [
  //     "GET_CAMPAIGNS"
  //   ]),
  //   campaigns: {
  //     get() {
  //       return this.GET_CAMPAIGNS
  //     },
  //     set() {
  //
  //     }
  //   }
  // },
  // mounted() {
  //   this.loadCampaigns();
  // },
  methods: {
    // ...mapMutations("campaign", [
    //   "STORE_CAMPAIGN"
    // ]),
    // calcColor(status) {
    //   if ('NEW' === status) return 'lime';
    //   if ('EMAILS_SENT' === status) return 'secondary';
    //   if ('EMAIL_OPEN' === status) return 'yellow';
    //   if ('LINK_CLICKED' === status) return 'deep-orange';
    //   if ('SUBMITTED_DATA' === status) return 'red';
    //   if ('FINISHED' === status) return 'green';
    // },
    // customFilter(group, queryText, itemText) {
    //   const groupName = group.name.toLowerCase()
    //   const searchText = queryText.toLowerCase()
    //   return groupName.indexOf(searchText) > -1
    // },
    // async loadCampaigns() {
    //   const campaigns = await this.$axios.$get('/campaign/corporate');
    //   this.STORE_CAMPAIGN(campaigns);
    // },
    goToCampaignCreation() {
      this.$router.push('/campaigns/create');
    }
  }
}
</script>

<style scoped>

</style>