<template>

    <v-card>
        <v-list three-line>
            <template v-for="(item, index) in items">
                <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                <v-list-item v-else :key="item.title" @click="">
                    <v-list-item-avatar>
                        <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-html="item.title"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-card>

</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {header: 'Обусждения'},
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        title: 'Позавтракаем в эти выходные?',
                        subtitle: "<span class='text--primary'>Коля Портнягин</span> &mdash; Я буду в твоем районе делать поручения в эти выходные. Хочешь потусоваться?",
                    },
                    {divider: true, inset: true},
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        title: 'Летний шашлык <span class="grey--text text--lighten-1">4</span>',
                        subtitle: "<span class='text--primary'>ответ Коле и Саше</span> &mdash; Хотел бы я приехать, но я нахожусь за городом в эти выходные.",
                    },
                    {divider: true, inset: true},
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        title: 'Эй-эй',
                        subtitle: "<span class='text--primary'>Катя Портнягина</span> &mdash; У вас есть рекомендации в Минске? Были ли вы когда-нибудь?",
                    },
                    {divider: true, inset: true},
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                        title: 'Подарок на ДР',
                        subtitle: "<span class='text--primary'>Михалыч</span> &mdash; Есть идеи о том, что мы должны подарить Петровичу на его день рождения?",
                    },
                    {divider: true, inset: true},
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                        title: 'Рецепт попробовать',
                        subtitle: "<span class='text--primary'>Читта-Бритта</span> &mdash; Мы должны есть это: натереть на терке, сквош, кукуруза и томатилло тако.",
                    },
                ]

            };
        },
        methods: {}

    }
</script>

<style scoped lang="scss">

</style>
