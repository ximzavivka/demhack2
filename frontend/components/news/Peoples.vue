<template>
    <v-container>
        <v-subheader>Сегодня рядом со мной</v-subheader>

        <v-expansion-panels popout>
            <v-expansion-panel v-for="(message, i) in messages" :key="i" hide-actions>
                <v-expansion-panel-header :expand-icon="mdiMenuDown">
                    <v-row align="center" class="spacer" no-gutters>
                        <v-col cols="4" sm="2" md="1">
                            <v-avatar size="3rem">
                                <img v-if="message.avatar" alt="Avatar" :src="message.avatar">
                                <v-icon v-else :color="message.color" v-text="message.icon"/>
                            </v-avatar>
                        </v-col>

                        <v-col class="hidden-xs-only" sm="5" md="3">
                            <strong v-html="message.name"/>
                            <span v-if="message.total" class="grey--text">&nbsp;({{ message.total }})</span>
                        </v-col>

                        <v-col class="text-no-wrap" cols="5" sm="3">
                            <v-chip v-if="message.new" :color="`${message.color} lighten-4`" class="ml-0" label small>
                                {{ message.new }} новый
                            </v-chip>
                            <strong v-html="message.title"/>
                        </v-col>

                        <v-col v-if="message.excerpt" class="grey--text text-truncate hidden-sm-and-down">
                            {{ message.excerpt }}
                        </v-col>
                    </v-row>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <v-divider/>
                    <v-card-text v-text="lorem"/>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
    import {mdiMixer, mdiSchool, mdiMenuDown} from '@mdi/js'

    export default {
        data() {
            return {
                mdiMenuDown: mdiMenuDown,
                messages: [
                    {
                        avatar: 'https://lh4.googleusercontent.com/-aqJmC30usX4/AAAAAAAAAAI/AAAAAAAACdE/ih05zPS4W5o/photo.jpg',
                        name: 'Дмитрий К.',
                        title: 'Добро пожаловать',
                        excerpt: 'Благодарим вас за присоединение к нам',
                    },
                    {
                        color: 'red',
                        icon: mdiMixer,
                        name: 'Помощь',
                        new: 1,
                        total: 3,
                        title: 'Обсуждения',
                    },
                    {
                        color: 'teal',
                        icon: mdiSchool,
                        name: 'Обучение',
                        new: 2,
                        total: 4,
                        title: 'Услуги',
                        exceprt: 'New deals available, Join Today',
                    },
                ],
                lorem: 'Коллаборация, или сотрудничество — процесс совместной деятельности в какой-либо сфере двух и более людей или организаций для достижения общих целей, при которой происходит обмен знаниями, обучение и достижение согласия.',

            };
        },
        methods: {}

    }
</script>

<style scoped lang="scss">

</style>
