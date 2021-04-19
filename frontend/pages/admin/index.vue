<template>
  <v-container>
    <v-row>
      <v-col >
        <v-card flat class="my-4" max-width="500">
          <v-card-title>Шаблоны писем
            <v-btn class="ml-4 mr-2" fab color="grey" small outlined @click="createTemplate">
              <v-icon dark> {{ mdiPlus }}</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <EmailCards/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card flat
                class="my-4"
                max-width="500">
          <v-card-title>
            Персональные кампании
            <v-btn
                class="ml-4 mr-2" fab color="grey" small outlined @click="goToCampaignCreation">
              <v-icon dark> {{ mdiPlus }}</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <CampaignCardsList :isPersonal="true"></CampaignCardsList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import EmailCards from "@/components/template/EmailCards";
import CampaignCardsList from "@/components/campaign/CampaignCardsList";
import {mdiInformation, mdiMail, mdiPlus} from "@mdi/js";
import {mapMutations} from "vuex";

export default {
  layout: 'admin',
  components: {EmailCards, CampaignCardsList},
  data: () => ({
    mdiMail, mdiInformation, mdiPlus,

    myTemplates: [
      {
        id: 4,
        name: 'Письмо от бухгалтерии',
        subject: 'Уведомление о задолженности'
      }
    ],
    selectedTemplate: -1,
    selectedMyTemplate: -1,
  }),
  mounted() {
    this.loadMyTemplates();
  },
  methods: {
    ...mapMutations("template", ["STORE_TEMPLATES"]),
    goToTemplate(templateId) {
      this.$router.push(`/template/${templateId}`)
    },
    createTemplate() {
      this.$router.push(`/template/create`)
    },
    async loadMyTemplates() {
      const myTemplates = await this.$axios.$get(`/template`);
      if (this.$isNotEmptyArray(myTemplates)) {
        this.STORE_TEMPLATES(myTemplates);
        this.myTemplates = myTemplates;
      } else {
        console.log('Ничего не пришло в запросе шаблонов')
      }
      return myTemplates;
    },
    goToCampaignCreation() {
      this.$router.push('/campaigns/create');
    }
  }
}
</script>

<style scoped>

</style>
