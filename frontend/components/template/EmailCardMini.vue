<template>
  <v-card
      class="mx-auto rounded-5 elevation-1"
      max-width="344"
      min-height="235"
      height="235"
      outlined
      rounded>
    <v-card-title class="caption" color="grey lighten-5"><i>Создан: {{ startDateFromNow() }}</i></v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title color="primary" class="mb-4 text-h6 font-weight-bold"
                               style="color:var(--v-primary-base) !important; text-align: left; height: 45px;  padding-top: 10px;">
                {{ name }}
            </v-list-item-title>



            <v-list-item-subtitle>{{ subject }}</v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions class="mb-3">
      <v-btn left outlined block color="primary" @click="goToTemplate(id)">Перейти</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import {mdiMail} from '@mdi/js'

export default {
  props: {
    id: {
      type: [String,Number],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    created: {
      type: String,
      required: false
    },
  },
  data() {
    return {
      mdiMail,
      bgColor: '',
      textColor: ''
    }
  },
  mounted() {
    this.defineColors();
  },
  methods: {
    stringToHslColor(str, s, l) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const h = hash % 360;
      return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    },

    defineColors() {
      const lightness = this.$vuetify.theme.dark ? 75 : 66;
      if (!this.bgColor) {
        const saturation = this.$vuetify.theme.dark ? 70 : 66;
        this.bgColor = this.stringToHslColor(this.name, saturation, lightness);
      }
      if (!this.textColor) {
        this.textColor = lightness > 70 ? '#d5d8de' : '#ffffff';
      }
    },
    startDateFromNow() {
      return this.$dateFns.formatDistanceToNow(this.$dateFns.parseISO(this.created), {addSuffix: true})
    },
    goToTemplate(templateId) {
      this.$router.push(`/template/${templateId}`)
    },
  }

}
</script>

<style scoped>

</style>
