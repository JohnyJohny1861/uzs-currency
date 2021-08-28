<template>
    <v-alert v-show="value.error"
             transition="fade-transition"
             dense type="error"
             style="position: absolute; top: 15px; right: 15px; z-index: 10;">
        {{ value.msg || 'Oops something went wrong' }}
    </v-alert>
</template>

<script>
export default {
    name: "AlertError",
    props: {
        value: { type: Object },
    },
    watch: {
        'value.error': async function(newVal) {
            if(newVal) {
                this.$emit('input', {
                    ...this.value,
                    success: false
                })
                await this.sleep(3500);

                this.$emit('input', {
                    ...this.value,
                    error: false
                })
            }
        }
    }
}
</script>

<style scoped>

</style>
