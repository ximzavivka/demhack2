<template>

    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="4"
            v-for="(template, index) in myTemplates" :key="template.id"
            class="pa-xl-4 pa-md-3 pa-sm-1" >
          <EmailCardMini
              :id="template.id"
              :name="template.name"
              :subject="template.subject"
              :created="template.created"/>
        </v-col>
      </v-row>
    </v-container>

</template>

<script>
import EmailCardMini from "@/components/template/EmailCardMini";
import {mapMutations} from "vuex";
import {mdiPlus} from '@mdi/js'

export default {
  components: {
    EmailCardMini
  },
  data() {
    return {
      mdiPlus,
      myTemplates: [],

    }
  },
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

  }
}
</script>

<style scoped>

</style>
