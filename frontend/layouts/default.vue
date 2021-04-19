<template>
    <v-app id="inspire" :dark="setTheme">

        <!-- LEFT NAVIGATION-->
        <v-navigation-drawer v-model="drawer" clipped app dark class="gradient"><!-- or `temporary` except `clipped`-->
            <!--Avatar-->
            <!--Menu-->
            <MenuList/>

            <!--Action Buttons-->
            <template v-slot:append>
                <div class="mx-3">
                    <v-switch label="темная тема" v-model="goDark"/>
                </div>
            </template>
        </v-navigation-drawer>

        <!--TOOLBAR-->
        <v-app-bar app clipped-left>
            <v-btn icon @click.stop="drawer = !drawer">
                <v-icon>{{mdiMenu}}</v-icon>
            </v-btn>

            <nuxt-link to="/" exact style="text-decoration: none;">
                <v-toolbar-title class="accent--text myfont ml-2">КОЛАБА</v-toolbar-title>
            </nuxt-link>
          <v-spacer/>
          <v-btn class="mr-2" depressed icon nuxt-link to="/dashboard/personal">
            <v-icon color="primary-lighten1">{{ mdiSignal }}</v-icon>
          </v-btn>

          <v-btn class="mr-2" depressed icon nuxt-link to="/admin">
            <v-icon color="primary-lighten1">{{ mdiLocationEnter }}</v-icon>
          </v-btn>
        </v-app-bar>


        <v-main>
            <nuxt/>
        </v-main>

        <!--FOOTER-->
        <v-footer dark padless>
            <v-card class="flex" text tile>
                <v-card-title> &copy;2021 — colaba
                    <v-spacer/>
                    <v-btn v-for="icon in footerIcons" :key="icon" class="mx-3" icon>
                        <v-icon size="2rem">{{ icon }}</v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-footer>

    </v-app>
</template>

<script>
    // import {mapGetters} from 'vuex';
    import MenuList from '~/components/navigation/MenuList.vue'
    import {mdiLoginVariant, mdiCommentProcessingOutline, mdiFacebook, mdiInstagram, mdiMenu, mdiSignal,mdiLocationEnter} from '@mdi/js'

    export default {
        components: {
            MenuList
        },
        created() {
            this.$store.dispatch('baseUrlForStatic');
        },
        computed: {
            setTheme() {
                this.$vuetify.theme.dark = this.goDark;
            }
        },
        data() {
            return {
                mdiCommentProcessingOutline, mdiInstagram, mdiFacebook, mdiMenu, mdiSignal,mdiLocationEnter,
                goDark: false,
                drawer: false,
                footerIcons: [mdiFacebook, mdiInstagram]
            }
        }
    }
</script>

<style scoped lang="scss">
    .gradient {
        background: rgb(108, 30, 180);
        background: linear-gradient(to top, rgba(108, 30, 180, 1) 0%, rgba(101, 96, 245, 1) 40%);
    }

    .radius {
        border-radius: 0 2rem 0 0;
    }

    .myfont {
        text-decoration: none;
        font-family: 'Amatic', cursive;
        font-size: 2rem;
    }

</style>
