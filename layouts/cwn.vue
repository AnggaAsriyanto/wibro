<template>
  <div class="app">
    <Header />
    <main class="main" @click="reset">
      <div class="content">
        <Nuxt />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
    methods: {
        reset() {
            this.$store.commit("resetBarInfoUser")
        }
    }
}
</script>