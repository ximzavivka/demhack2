<template>
  <v-card
      class="mx-auto rounded-5 elevation-1"
      max-width="344"
      min-height="310"
      height="310"
      outlined
      rounded>
    <v-card-title class="caption" color="grey lighten-5"><i>{{ startDateFromNow() }}</i>
      <v-chip class="ma-2" dark :color="calcColor(status)" small>
        {{ status.replaceAll('_', ' ') }}
      </v-chip>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title color="primary" class="mb-4 text-h6 font-weight-bold"
                               style="color:var(--v-primary-base) !important; text-align: left; height: 45px;  padding-top: 10px;">
              <div
                  style="display: inline-block;    text-overflow: ellipsis;    white-space: nowrap;    overflow: hidden;    width: 80%;">
                {{ name }}
              </div>
              <v-btn right small dark outlined fab color="primary" @click="goToCampaign(id)" style="margin-top: -10px !important;">
                <v-icon dark> {{ mdiPen }}</v-icon>
              </v-btn>
            </v-list-item-title>
            <v-list-item-subtitle class="py-2">
              <v-row>
                <v-btn v-if="!!group" text depressed style="text-transform: none" nuxt-link
                       :to="`/groups?id=${group.id}`">
                  <v-icon color="primary" class="mr-2">{{ mdiHumanQueue }}</v-icon>
                  {{ group.name }}
                </v-btn>
              </v-row>
              <v-row>
                <v-btn v-if="!!template" text depressed style="text-transform: none" nuxt-link
                       :to="`/template/${template.id}`">
                  <v-icon color="primary" class="mr-2">{{ mdiMail }}</v-icon>
                  {{ template.name }}
                </v-btn>
              </v-row>
              <v-row>
                <v-btn text depressed style="text-transform: none" @click="gotoLandingPage(landingPage)">
                  <v-icon color="primary" class="mr-2">{{ mdiBullseye }}</v-icon>
                  Фишинговая страница
                </v-btn>
              </v-row>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-spacer></v-spacer>

  </v-card>
</template>

<script>
import {mdiMail, mdiHumanQueue, mdiBullseye, mdiPen} from '@mdi/js'

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
    status: {
      type: String,
      required: true
    },
    created: {
      type: String,
      required: true
    },
    landingPage: {
      type: String,
      required: true
    },
    template: {
      type: Object,
      required: false
    },
    group: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      mdiMail, mdiHumanQueue, mdiBullseye, mdiPen,
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
    goToCampaign(campaignId) {
      this.$router.push(`/campaigns/${campaignId}`)
    },
    gotoLandingPage(landing) {
      window.location = landing;
    },
    calcColor(status) {
      if ('NEW' === status) return 'lime';
      if ('EMAILS_SENT' === status) return 'secondary';
      if ('EMAIL_OPEN' === status) return 'yellow';
      if ('LINK_CLICKED' === status) return 'deep-orange';
      if ('SUBMITTED_DATA' === status) return 'red';
      if ('FINISHED' === status) return 'green';
    },
  }

}
</script>

<style scoped>

</style>