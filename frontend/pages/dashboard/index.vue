<template>
  <v-container>
    <v-row>
      <v-card-text class="font-weight-bold text-h6 pl-0" style="color: var(--v-primary-base)">Общая статистика по
        кампаниям
      </v-card-text>
    </v-row>
    <v-row v-if="ready">
      <v-col cols="8">
        <v-row>
          <v-col cols="3">
            <v-card width="200" flat class="stat-card--outlined">
              <v-card-text style="color:var(--v-primary-base)">
                Получено писем
              </v-card-text>
              <v-card-text class="text-h3 font-weight-bold" style="color:var(--v-primary-base)">
                {{ overAllStatistics.sentQty }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card width="200" flat class="stat-card-yellow">
              <v-card-text style="color:white">
                Прочитано писем
              </v-card-text>
              <v-card-text class="text-h3 font-weight-bold" style="color:white">
                {{ overAllStatistics.openedQty }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card width="200" flat class="stat-card-pink">
              <v-card-text style="color:white">
                Открыто ссылок
              </v-card-text>
              <v-card-text class="text-h3 font-weight-bold" style="color:white">
                {{ overAllStatistics.clickedQty }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card width="200" flat class="stat-card-red">
              <v-card-text style="color:white">
                Отправлено данных
              </v-card-text>
              <v-card-text class="text-h3 font-weight-bold" style="color:white">
                {{ overAllStatistics.submittedQty }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card flat class="mt-16">
          <v-card-title>Все кампании</v-card-title>
          <v-divider></v-divider>
          <v-data-table
              :headers="headers"
              :items="campaigns"
              :items-per-page="5">
            <template #item.name="{item}">
              <router-link :to="{path: `/campaigns/${item.id}` }">
                {{ item.name }}
              </router-link>
            </template>
            <template #item.template="{item}">
              <router-link :to="{path: `/template/${item.template.id}` }">
                {{ item.template.name }}
              </router-link>
            </template>
            <template #item.group="{ item }">
              <router-link :to="{path: `/groups?id=${item.group.id}` }">
                {{ item.group.name }}
              </router-link>
            </template>
            <template #item.smtp="{ item }">
              <router-link :to="{path: '/smtp' }">
                по умолчанию
              </router-link>
            </template>

            <template #item.status="{ item }">
              <v-chip class="ma-2" dark :color="calcColor(item.status)" small>
                {{ item.status.replaceAll('_', ' ') }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      headers: [
        {text: 'Название', value: 'name', align: 'name', sortable: true},
        {text: 'Статус', value: 'status', align: 'start', sortable: true},
        {text: 'Шаблон письма', value: 'template', align: 'start', sortable: false},
        // {text: 'Настройки SMTP', value: 'smtp', align: 'start', sortable: false},
        {text: 'Группа', value: 'group', align: 'start', sortable: true},
        {text: 'Фишинговая страница', value: 'landingPage', align: 'start', sortable: false},
      ],
      overAllStatistics: {
        sentQty: 6,
        openedQty: 2,
        openedPercents: 33,
        clickedQty: 1,
        clickedPercents: 16,
        submittedQty: 0,
        submittedPercents: 0,
      },
      ready: false,
    }
  },
  mounted() {
    this.initStat();
    this.loadCampaigns();
  },
  methods: {
    ...mapMutations("campaign", [
      "STORE_CAMPAIGN_CORPORATE"
    ]),
    duration(date) {
      return this.$dateFns.intervalToDuration({start: 0, end: this.$dateFns.parseISO(date)})
    },
    simplifyDate(date) {
      return this.$dateFns.formatDistanceToNow(this.$dateFns.parseISO(date), {addSuffix: true});
    },
    async initStat() {
      this.overAllStatistics = await this.$axios.$get(`/analytic/group/`);
      this.ready = true;
    },
    calcColor(status) {
      if ('NEW' === status) return 'lime';
      if ('EMAILS_SENT' === status) return 'secondary';
      if ('EMAIL_OPEN' === status) return 'yellow';
      if ('LINK_CLICKED' === status) return 'deep-orange';
      if ('SUBMITTED_DATA' === status) return 'red';
      if ('FINISHED' === status) return 'green';
    },
    customFilter(group, queryText, itemText) {
      const groupName = group.name.toLowerCase()
      const searchText = queryText.toLowerCase()
      return groupName.indexOf(searchText) > -1
    },
    async loadCampaigns() {
      const campaigns = await this.$axios.$get('/campaign/corporate');
      this.STORE_CAMPAIGN_CORPORATE(campaigns);
    },
  },
  computed: {
    ...mapGetters("campaign", [
      "GET_CAMPAIGNS_CORPORATE"
    ]),
    campaigns: {
      get() {
        return this.GET_CAMPAIGNS_CORPORATE
      },
      set() {

      }
    },
    mounted() {
      this.loadCampaigns();
    },
  }
}
</script>

<style scoped lang="scss">

.stat-card-pink {
  border-radius: 15px;
  background: rgb(233, 30, 99);
  background: linear-gradient(14deg, rgba(233, 30, 99, 1) 0%, rgba(145, 76, 133, 1) 100%);
}

.stat-card-red {
  border-radius: 15px;
  background: rgb(233, 30, 30);
  background: linear-gradient(146deg, rgba(233, 30, 30, 1) 0%, rgba(102, 33, 26, 0.9981034650188201) 100%);
}

.stat-card-yellow {
  border-radius: 15px;
  background: rgb(34, 195, 128);
  background: linear-gradient(94deg, rgba(34, 195, 128, 1) 0%, rgba(253, 233, 45, 1) 100%);
}

.stat-card--outlined {
  border-radius: 15px;
  box-shadow: 17px 28px 29px 3px rgb(179 179 179 / 66%) !important;
  -webkit-box-shadow: 17px 28px 29px 3px rgb(179 179 179 / 66%) !important;
  -moz-box-shadow: 17px 28px 29px 3px rgb(179 179 179 / 66%) !important;
}

.simple-card {
  border-radius: 15px;
}

.chart-card {
  border-radius: 15px;
  padding-bottom: 15px;
}

</style>