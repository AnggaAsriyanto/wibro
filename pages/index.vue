<template>
  <fragment>
      <div v-show="this.postsLists" class="post-card-list">
          <div
          v-for="(post, idx) in this.postsLists" 
          :key="idx">
              <PostCard :post="post" />
          </div>
      </div>
    <!-- <InFeedAdsense
        v-if="mobile"
        data-ad-format="fluid"
        data-ad-layout-key="-63+dk-3p-8u+153"
        data-ad-client="ca-pub-1142153237520676"
        data-ad-slot="9728959860">
    </InFeedAdsense> -->
    <div v-if="this.postsLists.length == 9 && !loading" class="more-posts">
       <nuxt-link :to="{ name: 'posts-pages-idx', params: { idx: 1} }">
          <h5>Lihat lebih banyak <span><i class="fas fa-arrow-right"></i></span></h5>
       </nuxt-link>
    </div>
  </fragment>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'Berita & Info Anime Terupdate Indonesia | Wibro',
      link: [
        { rel: "canonical", href: "https://wibro.site/" }
      ]
    }
  },
  data() {
    return {
      loading: true,
      mobile: null,
    }
  },
  async asyncData({store}) {
    const postsLists = store.getters.postsFeeds

    return { postsLists }
  },
  mounted() {
    this.loading = false
    if(window.innerWidth < 550) {
      this.mobile = true
      return
    }

    this.mobile = false
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
