<template>
    <v-card :loading="loading">
        <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

        <v-card-title>Кафе Березка</v-card-title>

        <v-card-text>
            <v-row class="pl-2">
                <v-rating
                        :empty-icon="emptyIcon"
                        :halfIcon="halfIcon"
                        :full-icon="fullIcon"
                        :value="4.5"
                        color="amber"
                        half-increments
                        dense
                        size="14"
                        readonly
                />

                <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>

            <div class="my-4 subtitle-1 black--text">
                $ • Европейская кухня, Кафе
            </div>

            <div>Маленькие тарелки, салаты и сэндвичи в интимной обстановке с 12 местами в помещении и местами во
                внутреннем дворике.
            </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-text>
            <div class="title text--primary">Забронировать на сегодня</div>
            <v-chip-group
                    v-model="selection"
                    active-class="deep-purple accent-4 white--text"
                    column
            >
                <v-chip>15:30</v-chip>
                <v-chip>17:30</v-chip>
                <v-chip>18:00</v-chip>
                <v-chip>21:00</v-chip>
            </v-chip-group>
        </v-card-text>

        <v-card-actions>
            <v-btn
                    color="accent"
                    text
                    @click="reserve"
            >
                забронировать
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
    import {mdiHeartOutline, mdiHeart, mdiHeartHalfFull} from '@mdi/js'

    export default {
        data() {
            return {
                halfIcon: mdiHeartHalfFull,
                emptyIcon: mdiHeartOutline,
                fullIcon: mdiHeart,
                loading: false,
                selection: 1,
            };
        },
        methods: {
            reserve() {
                this.loading = true;

                setTimeout(() => (this.loading = false), 2000)
            },
        }

    }
</script>

<style scoped lang="scss">

</style>
