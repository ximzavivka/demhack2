<template>
  <v-container fluid>
    <v-row>
      <v-col
          v-for="(campaign, index) in campaigns" :key="campaign.id"
          class="pa-xl-4 pa-md-3 pa-sm-1"
          cols="12" sm="4">
        <CampaignCard
            :id="campaign.id"
            :name="campaign.name"
            :status="campaign.status"
            :created="campaign.created"
            :template="campaign.template"
            :landing-page="campaign.landingPage"
            :group="campaign.group"/>

      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import CampaignCard from "@/components/campaign/CampaignCard";
import {mapGetters, mapMutations} from "vuex";
import {mdiDelete, mdiPen, mdiPlus} from '@mdi/js'

export default {
  components: {
    CampaignCard
  },
  props: {
    isPersonal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      mdiDelete, mdiPlus, mdiPen,
      headers: [
        {text: 'Название', value: 'name', align: 'name', sortable: true},
        {text: 'Статус', value: 'status', align: 'start', sortable: true},
        {text: 'Шаблон письма', value: 'template', align: 'start', sortable: false},
        // {text: 'Настройки SMTP', value: 'smtp', align: 'start', sortable: false},
        {text: 'Группа', value: 'group', align: 'start', sortable: true},
        {text: 'Фишинговая страница', value: 'landingPage', align: 'start', sortable: false},
      ]
    }
  },
  computed: {
    ...mapGetters("campaign", [
      "GET_CAMPAIGNS_CORPORATE", "GET_CAMPAIGNS_PERSONAL"
    ]),
    campaigns: {
      get() {
        return this.isPersonal ? this.GET_CAMPAIGNS_PERSONAL : this.GET_CAMPAIGNS_CORPORATE
      },
      set() {

      }
    }
  },
  mounted() {
    this.loadCampaigns();
  },
  methods: {
    ...mapMutations("campaign", [
      "STORE_CAMPAIGN_CORPORATE", "STORE_CAMPAIGN_PERSONAL"
    ]),
    calcColor(status) {
      if ('NEW' === status) return 'lime';
      if ('EMAILS_SENT' === status) return 'secondary';
      if ('EMAIL_OPEN' === status) return 'yellow';
      if ('LINK_CLICKED' === status) return 'deep-orange';
      if ('SUBMITTED_DATA' === status) return 'red';
      if ('FINISHED' === status) return 'green';
    },
    async loadCampaigns() {
      let url;
      if (this.isPersonal) {
        url = '/campaign/personal'
      } else {
        url = '/campaign/corporate'
      }
      const campaigns = await this.$axios.$get(url);
      if (this.isPersonal) {
        this.STORE_CAMPAIGN_PERSONAL(campaigns);
      } else {
        this.STORE_CAMPAIGN_CORPORATE(campaigns);
      }
    },
    goToCampaignCreation() {
      this.$router.push('/campaigns/create');
    }
  }
}
</script>

<style scoped>

</style>
