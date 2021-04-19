<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
          <v-text-field
              v-model="selectedCampaign.name"

              :rules="nameRules"
              label="Название"
              required
          ></v-text-field>
          <v-text-field
              v-model="selectedCampaign.landingPage"
              :rules="nameRules"
              label="Фишинговая страница(URL)"
              required></v-text-field>
<!--          <v-text-field-->
<!--              v-model="selectedCampaign.start"-->
<!--              label="Дата запуска"-->
<!--              required></v-text-field>-->
          <v-autocomplete
              :items="allGroups"
              :filter="customFilter"
              item-text="name"
              item-value="id"
              label="Группа"
              v-model="campaign.group"
          ></v-autocomplete>
<!--          <nuxt-link to="/smtp">SMTP по умолчанию</nuxt-link>-->
          <v-autocomplete class="mt-4"
                          :items="allTemplates"
                          :filter="customFilter"
                          item-text="name"
                          item-value="id"
                          label="Шаблон письма"
                          v-model="campaign.template"
          ></v-autocomplete>
          <v-btn
              :disabled="!valid"
              color="deep-purple lighten-2"
              class="mr-4"
              :dark="valid"
              @click="saveAndLaunch">
            Запустить Кампанию
          </v-btn>
          <v-snackbar
              v-model="hasSaved"
              :timeout="2000"
              absolute
              bottom
              color="success"
              left>
            Кампания создана и запущена
          </v-snackbar>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      valid: true,
      groups: [],
      templates: [],
      hasSaved:false,
      campaignId: '',
      selectedCampaign: {},
      campaign: {
        name: '',
        landingPage: 'https://localhost:8080/landing/creds',
        group: {
          id: 0,
          name: '',
        },
        template: {
          id: 0,
          name: '',
        }
      },
      nameRules: [
        v => !!v || 'Имя обязательное поле',
      ],

    }
  },
  computed: {
    ...mapGetters("users", ["GET_GROUPS"]),
    ...mapGetters("template", ["GET_TEMPLATES"]),
    allGroups: {
      get() {
        return this.groups = this.GET_GROUPS;
      },
      set() {
      }
    },
    allTemplates: {
      get() {
        return this.templates = this.GET_TEMPLATES;
      },
      set() {
      }
    }
  },
  watch: {
    campaign: {
      handler(newCampaign, oldCampaign) {
        this.selectedCampaign = newCampaign;
      }
    },
    watch: {
      hasSaved(value) {
        if (value === false) {
          this.$router.push(`/campaigns`)
        }
      }
    },
  },
  mounted() {
    this.campaign = this.loadCampaignById();
  },
  created() {
    this.groupsList();
    this.templatesList();
  },
  methods: {
    ...mapMutations("campaign", ["STORE_CAMPAIGN", "ADD_NEW_CAMPAIGN"]),
    ...mapMutations("users", ["STORE_GROUPS"]),
    ...mapMutations("template", ["STORE_TEMPLATES"]),
    validate() {
      this.$refs.form.validate()
    },
    async loadCampaignById() {
      if (!!this.$route.params && !!this.$route.params.id) {
        this.campaignId = this.$route.params.id;
        this.campaign = await this.$axios.$get(`/campaign/${this.campaignId}`);
      }
      return this.campaign;
    },
    saveAndLaunch() {
      this.validate();
      if (this.valid) {
        let payload;
        if (!!this.selectedCampaign && !!this.selectedCampaign.id) {
          payload = {
            id: this.selectedCampaign.id,
            name: this.selectedCampaign.name,
            landingPage: this.selectedCampaign.landingPage,
          }
        } else {
          payload = {name: this.selectedCampaign.name};
        }
        this.$axios.post(`/campaign`, payload).then(res => {
          this.selectedCampaign.id = res.data.id;
          this.campaign.id = res.data.id;
          this.linkCampaign(res.data.id)
        });
      }
    },

    linkCampaign(campaignId) {
      console.log('[linkCampaign]!!!!!!!!!!!!!!2324~!~~~~')
      console.log(this.campaign)
      this.$axios.put(`/campaign/${campaignId}/template`, !!this.campaign.template.id ? this.campaign.template.id : this.campaign.template).then(value => {
        this.$axios.put(`/campaign/${campaignId}/group`, !!this.campaign.group.id ? this.campaign.group.id : this.campaign.group).then(value1 => {
         this.$axios.$post(`/campaign/${campaignId}`) //launch campaign
        });
      });

    },

    customFilter(group, queryText, itemText) {
      const name = group.name.toLowerCase()
      return name.indexOf(queryText) > -1
    },

    async groupsList() {
      const groups = await this.$axios.$get(`/group`);
      if (this.$isNotEmptyArray(groups)) {
        this.STORE_GROUPS(groups);
      } else {
        console.log('Ничего не пришло в запросе групп')
      }
      return groups;
    },
    async templatesList() {
      const templates = await this.$axios.$get(`/template`);
      if (this.$isNotEmptyArray(templates)) {
        this.STORE_TEMPLATES(templates);
      } else {
        console.log('Ничего не пришло в запросе шаблона')
      }
      return templates;
    }
  }
}
</script>

<style lang="scss" scoped>
.container-editor {
  width: 100%;
  margin: 0 auto;
  padding: 0 0 10px;

  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>