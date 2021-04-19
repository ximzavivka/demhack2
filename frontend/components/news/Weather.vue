<template>
    <v-card class="mx-auto">
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="headline">Родительское собрание</v-list-item-title>
                <v-list-item-subtitle>ШКОЛА №46, Камайская 21</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-card-text>
            <v-row align="center">
                <v-col class="display-3" cols="8">
                    19:30
                </v-col>
                <v-col cols="4">
                    <v-img :src='building' alt="Sunny image" width="92"/>
                </v-col>
            </v-row>
        </v-card-text>

        <v-list-item>
            <v-list-item-icon>
                <v-icon>{{mdiAccountMultipleOutline}}</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>Выбор родительского комитета</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
            <v-list-item-icon>
                <v-icon>{{mdiGhost}}</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>Сбор средств на новые жалюзи</v-list-item-subtitle>
        </v-list-item>

        <v-slider
                color="accent"
                v-model="time"
                :max="6"
                :tick-labels="labels"
                class="mx-4"
                ticks
        />

        <v-list class="transparent">
            <v-list-item v-for="item in forecast" :key="item.day">
                <v-list-item-title>{{ item.day }}</v-list-item-title>

                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-subtitle class="text-right">
                    {{ item.temp }}
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>

        <v-divider/>

        <v-card-actions>
            <v-btn text color="accent">Полный список</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mdiAccountMultipleOutline, mdiGhost, mdiWhiteBalanceSunny, mdiWhiteBalanceIridescent} from '@mdi/js'

    export default {
        data() {
            return {
                mdiGhost: mdiGhost,
                mdiWhiteBalanceSunny: mdiWhiteBalanceSunny,
                mdiWhiteBalanceIridescent: mdiWhiteBalanceIridescent,
                mdiAccountMultipleOutline: mdiAccountMultipleOutline,
                building: require('assets/images/chemodan.png'),
                labels: ['ПОН', 'ВТ', 'СР', 'ЧТВ', 'ПТН', 'СБ', 'ВСКР'],
                time: 1,
                forecast: [
                    {day: 'Среда', icon: mdiWhiteBalanceSunny, temp: 'День учителя'},
                    {day: 'Пятница', icon: mdiWhiteBalanceIridescent, temp: 'Фотографии с питоном'}
                ]
            };
        },
        methods: {}

    }
</script>

<style scoped lang="scss">

</style>
