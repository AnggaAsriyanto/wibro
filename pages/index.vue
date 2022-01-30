<template>
  <fragment>
    <div v-if="!loading" class="post-card-list">
        <nuxt-link
        v-for="(post, idx) in postsFeeds" 
        :key="idx"
        :to="{ name: 'posts-id-title', params: { title: post.postTitle.replace(/\s+/g, '-').toLowerCase(), id: post.postId } }">
            <PostCard :post="post" />
        </nuxt-link>
    </div>
    <div v-if="postsFeeds.length == 9 && !loading" class="more-posts">
       <nuxt-link :to="{ name: 'posts-pages-idx', params: { idx: 1} }">
          <h5>Lihat lebih banyak <span><i class="fas fa-arrow-right"></i></span></h5>
       </nuxt-link>
    </div>
    <CompLoad v-else />
  </fragment>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'Info Anime Terupdate | Wibro',
      meta: [
        { name: 'description', content: 'List berita dan info anime terbaru'}
      ]
    }
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    this.loading = false
  },
  destroyed() {
    this.loading = true
  },
  computed: {
    postsFeeds() {
      return this.$store.getters.postsFeeds
    },
  }
}
</script>

<style lang="scss">
.more-posts {
  margin: .5rem auto;
  padding: .5rem 1rem;
  background-color: #43d5fa;
  width: max-content;
  border-radius: 2px;
  cursor: pointer;
  a {
    text-decoration: none;
  }
  h5 {
    color: #fff;
  }
  span {
    margin-left: .3rem;
  }
}
</style>
