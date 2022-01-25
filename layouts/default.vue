<template>
  <div class="app">
    <Navbar />
    <div class="main" @click="reset">
      <div :class="{ content: true, article: isArticle }">
        <Nuxt />
      </div>
      <Sidebar />
    </div>
    <Footer />
  </div>
</template>

<script>
import Loading from '../components/Loading.vue'
export default {
  components: { Loading },
  data() {
    return {
      isArticle: null,
      isPost: null,
    }
  },
  created() {
    this.checkRoute()
  },
  methods: {
    checkRoute() {
      this.isArticle = false

      if(
        this.$route.name === 'posts-id-title' ||
        this.$route.name === 'post-preview'
      ) {
        this.isArticle = true
        return;
      }
    },
    reset() {
      this.$store.commit("resetBarInfoUser")
    }
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  }
}
</script>