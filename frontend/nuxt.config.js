require('dotenv').config();
const webpack = require('webpack');
import pkg from './package';
import ru from 'vuetify/es5/locale/ru';
import en from 'vuetify/es5/locale/en';
import colors from 'vuetify/lib/util/colors';
import overriddenMdiIcons from './assets/mdiJsSvgIcons';

export default {
    head: {
        title: pkg.name,
        meta: [
            {charset: 'utf-8'},
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
            },
            {name: 'yandex-verification', content: '0f0fcbfb95f22d90'},
            {hid: 'description', name: 'description', content: pkg.description}
        ],
        link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
    },
    loading: {color: '#3B8070'},
    css: ['~assets/fonts/fonts.css'],

    vuetify: {
        treeShake: true,
        defaultAssets: false,
        icons: {iconfont: 'mdiSvg', values: overriddenMdiIcons},
        lang: {locales: {ru, en}, current: 'ru'},
        customVariables: ['~/assets/style/variables.scss'],
        theme: {
            options: {customProperties: true},
            themes: {
                light: {
                    primary: colors.deepPurple.lighten2,
                    secondary: colors.indigo.accent1,
                    accent: colors.deepOrange.accent2,
                    darken: colors.grey.darken3,
                },
                dark: {
                    darken: colors.grey.lighten3,
                }
            }
        }
    },
    modules: ['@nuxtjs/axios'],
    buildModules: ['@nuxtjs/vuetify', '@nuxtjs/dotenv', ['@nuxtjs/date-fns', { defaultLocale: 'ru', locales: ['ru'], methods: ['formatDistanceToNow', 'parseISO', 'isThisWeek'] }]],
    plugins: ['@/plugins/utils.js', '@/plugins/axios'],
    axios: {debug: true /* , https: true */},
}
