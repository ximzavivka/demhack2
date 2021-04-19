<template>
    <section>
        Подробности
    </section>
</template>


<script>
    export default {
        data() {
            return {
                errored: false
            };
        },
        methods: {
            async getHello() {
                return ['hello'];
            }
        }

    }
</script>

<style scoped lang="scss">

</style>
