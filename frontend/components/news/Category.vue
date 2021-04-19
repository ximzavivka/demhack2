<template>

    <v-card>

        <v-list-item>
            <v-list-item-avatar color="grey">
                <v-img :src="avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title class="headline">Лучший стейк. Где?</v-list-item-title>
                <v-list-item-subtitle>Коля Портнягин</v-list-item-subtitle>
            </v-list-item-content>

        </v-list-item>


        <v-img src="https://avatars.mds.yandex.net/get-pdb/1676693/d45a2a04-1c8a-4991-8f57-50a825dd085b/s375"
               height="15rem"
        >
        </v-img>

        <v-card-text>
            Сбор около 6-го подъезда в 15:00. С собой брать хорошее настроение.
        </v-card-text>

        <v-card-actions>
            <v-btn text color="accent">
                Подробнее
            </v-btn>
            <v-btn text >
                Закладки
            </v-btn>
            <div class="flex-grow-1"></div>
            <v-btn icon>
                <v-icon>{{mdiHeart}}</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>{{mdiShareVariant}}</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
    import {mdiHeart, mdiShareVariant} from '@mdi/js'

    export default {

        data() {
            return {
                mdiHeart: mdiHeart,
                mdiShareVariant: mdiShareVariant,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
            };
        },
        methods: {}

    }
</script>

<style scoped lang="scss">

</style>
