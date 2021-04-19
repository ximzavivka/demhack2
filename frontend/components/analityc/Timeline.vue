<template>
  <v-card v-if='ready' flat class="pt-4 pb-8">
<!--    <div class="pl-4 mb-4">-->
<!--      <h2>{{ campaign.name }}</h2>-->
<!--      <span>Cтатистика</span>-->
<!--    </div>-->
    <v-timeline align-top dense>
      <v-timeline-item small>
        <v-row class="pt-1">
          <v-col cols="4">
            <span>{{ simplifyDate(campaign.created) }}</span>
          </v-col>
          <v-col>
            <strong>Начало кампании</strong>
            <div class="caption">Письма отправлены</div>
          </v-col>
        </v-row>
      </v-timeline-item>

      <v-timeline-item v-if="!!audit.opened" color="orange" small>
        <v-row class="pt-1">
          <v-col cols="4">
            <span>{{ simplifyDate(audit.opened) }}</span>
          </v-col>
          <v-col>
            <strong>Письмо открыто</strong>
            <div class="caption mb-2">Вы просмотрели письмо</div>
          </v-col>
        </v-row>
      </v-timeline-item>

      <v-timeline-item v-if="!!audit.clicked" color="pink" small>
        <v-row class="pt-1">
          <v-col cols="4">
            <span>{{ simplifyDate(audit.clicked) }}</span>
          </v-col>
          <v-col>
            <strong>Ссылка открыта</strong>
            <div class="caption mb-2">Вы перешли по фишинговой ссылке</div>
          </v-col>
        </v-row>
      </v-timeline-item>

      <v-timeline-item v-if="!!audit.submitted" color="error" small>
        <v-row class="pt-1">
          <v-col cols="4">
            <span>{{ simplifyDate(audit.submitted) }}</span>
          </v-col>
          <v-col>
            <strong>Скомпроментированные данные</strong>
            <div class="caption">
              Вы отправили свои персональные данные мошенникам
            </div>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script>


export default {
  name: "index",
  layout: 'personal',
  props: {
    campaign: {
      type: Object,
      required: true
    },
    audit: {
      type: Object,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      statistics: null,
      // TODO: to parent

      ready: false,
    }
  },
  mounted() {
    this.initStat();
  },
  methods: {
    duration(date) {
      return this.$dateFns.intervalToDuration({start: 0, end: this.$dateFns.parseISO(date)})
    },
    simplifyDate(date) {
      return this.$dateFns.formatDistanceToNow(this.$dateFns.parseISO(date), {addSuffix: true});
    },

    async initStat() {
      this.statistics = await this.$axios.$get(`/analytic/personality/${this.userId}`);
      this.ready = true;
    },
  }
}
</script>

<style scoped lang="scss">

</style>
