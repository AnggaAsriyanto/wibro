<template>
  <fragment>
    <client-only>
      <div class="post-card-list">
          <nuxt-link
          v-for="(post, idx) in this.postsLists" 
          :key="idx"
          :to="{ name: 'posts-id-title', params: { title: post.postTitle.replace(/\s+/g, '-').toLowerCase(), id: post.postId } }">
              <PostCard v-show="post" :post="post" />
          </nuxt-link>
      </div>
    </client-only>
    <!-- <InFeedAdsense
        v-if="mobile"
        data-ad-format="fluid"
        data-ad-layout-key="-63+dk-3p-8u+153"
        data-ad-client="ca-pub-1142153237520676"
        data-ad-slot="9728959860">
    </InFeedAdsense> -->
    <div v-show="this.postsLists.length == 9 && !loading" class="more-posts">
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
      title: 'Info Anime Terupdate | Wibro',
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
