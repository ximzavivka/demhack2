<template>
  <v-container>
    <v-card flat
            class="my-4"
            max-width="500">
      <v-card-title>Шаблоны писем <v-btn
          class="ml-4 mr-2" fab color="grey" small outlined @click="createTemplate">
        <v-icon dark> {{ mdiPlus }}</v-icon>
      </v-btn></v-card-title>
    </v-card>
    <EmailCards></EmailCards>
  </v-container>
</template>

<script>
import {mdiMail, mdiInformation, mdiPlus} from '@mdi/js'
import {mapMutations} from "vuex";
import EmailCards from "@/components/template/EmailCards";

export default {
  components: {EmailCards},
  data: () => ({
    mdiMail, mdiInformation, mdiPlus,
    defaultTemplates: [
      {
        id: 1,
        name: 'Письмо от бухгалтерии',
        subject: 'Уведомление о задолженности'
      },
      {
        id: 2,
        name: 'Проблема с входом в аккаунт',
        subject: 'Необычный вход в аккаунт'
      },
      {
        id: 3,
        name: 'Данные скомпроментированны',
        subject: 'Ваш аккаунт был заблокирован (Заявка №РР-320-49492)'
      },
    ],
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
    ...mapMutations("template",["STORE_TEMPLATES"]),
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
  }
}
</script>

<style scoped>

</style>