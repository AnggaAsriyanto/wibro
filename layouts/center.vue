<template>
  <div class="app">
    <header>
        <nav>
            <div class="nav-menu">
                <div class="brand">
                    <nuxt-link to="/">
                      <img src="../static/wibro.svg" alt="wibro logo">
                    </nuxt-link>
                </div>
            </div>
        </nav>
    </header>
    <main class="main">
      <Loading v-if="$store.state.postsLoad" />
      <div :class="{ content: true, post: isPost, focus: isFocus }">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPost: null,
      isFocus: null,
    }
  },
  created() {
    this.checkRoute()
  },
  methods: {
    checkRoute() {
      this.isPost = false
      this.isFocus = false

      if(
        this.$route.name === 'users-login' ||
        this.$route.name === 'users-register' ||
        this.$route.name === 'users-edit-profile' ||
        this.$route.name === 'admin') {
        this.isFocus = true
        return;
      }

      if(
        this.$route.name === 'create-post' ||
        this.$route.name === 'edit-post-id-title') {
        this.isPost = true
        return;
      }
    }
  },
  watch: {
    $route() {
      this.checkRoute();
      console.log(this.isArticle)
    }
  }
}
</script>

<style scoped>
.main {
  background-color: #dddddd;
}
</style>>

</style>