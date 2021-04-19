<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="full-width full-height my-auto">
      <v-col cols="1" class="hidden-sm-and-down"/>

      <v-col md="5" sm="9">
        <v-card flat>
          <v-card-text>
            <h1 class="huge font-weight-black">
              Проверь себя на <span class="primary--text">фишинг</span>
            </h1>
            <div class="mt-4 subtitle-1">
              <p> Еще никогда не было так просто проверить свою устойчивость к фишинговым атакам.
              Только заплатив за свои ошибки мы делаем выводы.</p>
              <p> Зарегистрируйтесь, пополните баланс и ждите ⏳</p>
            </div>
          </v-card-text>

          <v-card-actions class="mx-auto " >
            <v-btn to="/check" class="mx-2" outlined color="primary" large >Проверь себя</v-btn>
            <v-btn to="/groups" class="mx-2"  plain color="indigo" large>Проверь других</v-btn>
          </v-card-actions>
        </v-card>

      </v-col>

      <v-col class="hidden-sm-and-down">
        <v-img contain max-height="60vh" :src='mainImg'/>
      </v-col>


    </v-row>
  </v-container>
</template>


<script>
import {mdiHeartOutline, mdiHeart} from '@mdi/js'

export default {
  layout: 'landing',
  data() {
    return {
      mdiHeartOutline, mdiHeart,
      mainImg: require('assets/images/main.png'),

    };
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/components/VToolbar/_variables.scss';

.full-width {
  max-width: inherit !important;
}

.full-height {
  height: calc(100vh - #{$toolbar-collapsed-max-width} * 1.5);
}

.huge {
  font-size: 3em;
  line-height: 1.2em;
}
</style>
