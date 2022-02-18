<template>
    <div class="paginations">
        <button @click="back" :disabled="isFirst" class="item-page">Back</button>
        <nuxt-link v-if="!isFirst" :to="{ name: linkName, params: { name: this.$route.params.name, value: this.$route.params.value, idx: idx - 1 }}" class="item-page link">
            {{ idx - 1 }}
        </nuxt-link>
        <nuxt-link :to="{ name: linkName, params: { name: this.$route.params.name, value: this.$route.params.value, idx: idx }}" class="item-page link">
            {{ idx }}
        </nuxt-link>
        <nuxt-link v-if="!isLast" :to="{ name: linkName, params: { name: this.$route.params.name, value: this.$route.params.value, idx: idx + 1 }}" class="item-page link">
            {{ idx + 1 }}
        </nuxt-link>
        <button @click="next" :disabled="isLast" class="item-page">Next</button>
    </div>
</template>

<script>
export default {
    props: [
        'linkName',
        'back',
        'next',
        'isFirst',
        'isLast',
        'idx'
    ],
}
</script>

<style>

</style>