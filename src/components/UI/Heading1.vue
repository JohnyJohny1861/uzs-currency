<template>
    <h3 class="Heading1">{{ title }}</h3>
</template>

<script>
export default {
    name: "Heading1",
    props: {
        title: { type: String, default: '' }
    }
}
</script>

<style scoped lang="scss">
    .Heading1 {
        font-size: 22px;
        font-weight: 700;
        line-height: 28px;
        margin-bottom: 16px;
    }
</style>
