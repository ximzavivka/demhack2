<template>
  <v-container>
    <v-row class="py-0 my-0">
      <v-col cols="12" sm="3" class="hidden-sm-and-down">
        <v-card-text class="font-weight-bold text-h6 pl-0" style="color: var(--v-primary-base)">
          Обзор статистики
        </v-card-text>
      </v-col>

      <v-col cols="12" sm="4" xs="12">
        <v-text-field
            label="Введите E-mail пользователя"
            outlined
            color="primary"
            v-model="emailSearch"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn color="primary lighten1" style="height: 54px;" @click="searchUser()">
          <v-icon>{{ mdiAccountSearch }}</v-icon> Найти
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="!!user" class="fill-height" style="margin-top: -40px;">
      <v-col cols="3">
        <v-card
            color="primary lighten4"
            dark
            width="255"
            max-width="255">
          <v-card-title class="pb-0">
            <span class="title font-weight-light">{{ user.firstName }} {{ user.lastName }}</span>
          </v-card-title>
          <v-card-actions class="pa-0">
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                    class="elevation-6"
                    alt=""
                    src="https://localhost:8080/static/avatars/man.png"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-title style="font-size: 12px !important">{{ user.email }}</v-list-item-title>
            </v-list-item>
          </v-card-actions>

          <v-row class="mx-auto">
            <v-col cols="6" class="mx-auto">
              <v-card outlined class="stat-card--outlined" width="120" style="background: white">
                <v-card-subtitle style="color:var(--v-primary-base)" class="pb-2">Баланс</v-card-subtitle>
                <v-card-title v-if="!!this.userStats&&this.userStats.clickedQty>0" style="color:var(--v-primary-base)"
                              class="pt-0">0₽
                </v-card-title>
                <v-card-title v-else style="color:var(--v-primary-base)" class="pt-0">1000₽</v-card-title>
              </v-card>
            </v-col>
            <v-col cols="6" class="mx-auto">
              <v-card flat dark color="accent" width="120" style="border-radius: 15px;">
                <v-card-subtitle class="pb-2">Списано</v-card-subtitle>
                <v-card-title v-if="!!this.userStats&&this.userStats.clickedQty>0" class="pt-0">1000₽</v-card-title>
                <v-card-title v-else="!!this.userStats&&this.userStats.clickedQty>0" class="pt-0">0₽</v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="8" xs="12">
        <v-row>
          <v-col cols="12" sm="3">
            <v-card width="200" flat class="stat-card--outlined">
              <v-card-text style="color:var(--v-primary-base)">
                Получено писем
              </v-card-text>
              <v-card-text class="text-h3 font-weight-bold" style="color:var(--v-primary-base)">
                {{ userStats.sentQty }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3" xs="12">
            <v-card width="200" flat class="stat-card-yellow">
              <v-card-text style="color:white">
                Прочитано писем
              </v-card-text>
              <v-card-text class="text-h3 font-weight-bold" style="color:white">
                {{ userStats.openedQty }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3" xs="12">
            <v-card width="200" flat class="stat-card-pink">
              <v-card-text style="color:white">
                Открыто ссылок
              </v-card-text>
              <v-card-text class="text-h3 font-weight-bold" style="color:white">
                {{ userStats.clickedQty }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3" xs="12">
            <v-card width="200" flat class="stat-card-red">
              <v-card-text style="color:white">
                Отправлено данных
              </v-card-text>
              <v-card-text class="text-h3 font-weight-bold" style="color:white">
                {{ userStats.submittedQty }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" xs="12">
            <v-autocomplete
                v-if="!!userStats && ready"
                :items="campaigns"
                item-text="name"
                item-value="id"
                label="Посмотреть статистику по кампании"
                v-model="selectedCampaign"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" xs="12">
            <Timeline v-if="!!selectedCampaign" :userId="user.id" :campaign="campaignById()"
                      :audit="auditByCampaignId()"/>
          </v-col>

        </v-row>
        <v-row v-if="!!user">
          <v-col cols="4">
            <v-card class="chart-card" flat width="250">
              <v-card-text>
                Прочитано писем, %
              </v-card-text>
              <Doughnut :chartdata="chartdataOpened" :options="options" :value="40" :height="250" :width="250"/>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="chart-card" flat width="250">
              <v-card-text>
                Открыто ссылок, %
              </v-card-text>
              <Doughnut :chartdata="chartdataClick" :options="options" :value="40" :height="250" :width="250"/>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="chart-card" flat width="250">
              <v-card-text>
                Отправлено данных, %
              </v-card-text>
              <Doughnut :chartdata="chartdataSubmit" :options="options" :value="40" :height="250" :width="250"/>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import Doughnut from "@/components/chart/Doughnut";
import Timeline from '~/components/analityc/Timeline';
import {mdiAccountSearch} from '@mdi/js'
import {mapGetters, mapMutations} from "vuex";

export default {
  components: {
    Doughnut, Timeline
  },
  name: "index",
  layout: 'personal',
  data() {
    return {
      ready: false,
      campaigns: null,
      audits: null,
      mdiAccountSearch,
      user: {},
      emailSearch: '',
      userStats: {},
      selectedCampaign: '',
      userId: '',
      bgColor: '',
      textColor: '',
      chartdataClick: {
        labels: ['Открыто ссылок'],
        datasets: [
          {
            backgroundColor: ['#b18fe9'],
            data: [1],
            percentage: ''
          }
        ]
      },
      chartdataSubmit: {
        labels: ['Отправлено данных'],
        datasets: [
          {
            backgroundColor: ['#df323b'],
            data: [1],
            percentage: ''
          }
        ]
      },
      chartdataOpened: {
        labels: ['Открыто писем'],
        datasets: [
          {
            backgroundColor: ['#4caf50'],
            data: [1],
            percentage: ''
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 40,
        title: {
          display: true,
          align: 'center',
          horizontalAlign: "center",
          verticalAlign: "bottom",
          dockInsidePlotArea: true
        },
        legend: {
          display: true,
          position: 'bottom',
        },
      }
    }
  },
  mounted() {
    this.loadUser();

  },
  computed: {
    ...mapGetters("campaign", ["GET_USER_CAMPAIGNS"]),
    allCampaigns: {
      get() {
        return this.GET_USER_CAMPAIGNS;
      },
      set() {
      }
    },
  },
  watch: {
    userStats() {
      this.chartdataClick.datasets[0].data = [this.userStats.clickedQty]
      this.chartdataClick.datasets[0].percentage = this.userStats.clickedPercents + '%';

      this.chartdataSubmit.datasets[0].data = [this.userStats.submittedQty]
      this.chartdataSubmit.datasets[0].percentage = this.userStats.submittedPercents + '%';

      this.chartdataOpened.datasets[0].data = [this.userStats.openedQty]
      this.chartdataOpened.datasets[0].percentage = this.userStats.openedPercents + '%';

      this.campaigns = this.userStats.personalCampaigns;
      this.STORE_USER_CAMPAIGN(this.campaigns);
      this.audits = this.userStats.personalAudits;
      this.ready = true;
    },

  },
  methods: {
    ...mapMutations("campaign", ["STORE_USER_CAMPAIGN"]),
    async loadAllUserData(userId) {
      console.log(`[loadAllUserData] id=${userId}`)
      this.userStats = await this.$axios.$get(`/analytic/personality/${userId}`);

    },
    auditByCampaignId() {
      console.log(`auditByCampaignId=${this.selectedCampaign}`);
      const audit = !!this.audits && !!this.selectedCampaign ? this.audits.find(a => a.campaignId === this.selectedCampaign) : {};
      console.log(`[auditByCampaignId] audit=${JSON.stringify(audit)}`);
      return audit
    },
    campaignById() {
      console.log(`campaignById=${this.selectedCampaign}`);
      const campaign = !!this.campaigns && !!this.selectedCampaign ? this.campaigns.find(a => a.id === this.selectedCampaign) : {};
      console.log(`[campaignById] campaign=${JSON.stringify(campaign)}`);
      return campaign;
    },
    async loadUser() {
      const userId = this.$route.query.id;
      console.log(`[loadUser] id=${userId}`)
      await this.$axios.get(`/user/${userId}`).then(value => {
        this.loadAllUserData(userId);
        this.user = value.data;
      });

      return this.user;
    },
    stringToHslColor(str, s, l) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const h = hash % 360;
      return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    },

    async searchUser() {
      console.log(`[searchUser] id=${this.emailSearch}`)
      this.$axios.get(`/user/${this.emailSearch}`).then(value => {
        this.loadAllUserData(this.emailSearch);
        this.user = value.data;
      });

      return this.user;
    }
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
