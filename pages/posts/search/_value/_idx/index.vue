<template>
  <fragment>
    <div v-if="this.posts.length > 0">
      <div class="page-desc">
        <small>Page {{this.idx}} of {{this.idxPosts}}</small>
        <small>{{this.posts.length}} hasil</small>
      </div>
      <div v-show="this.posts" class="post-card-list">
        <div
        v-for="(post, idx) in this.posts.slice(this.startIdx, this.endIdx)" 
        :key="idx"
        >
          <PostCard :post="post" />
        </div>
      </div>
      <Pagination v-show="this.posts.length > 0" :linkName="linkName" :back="back" :next="next" :isFirst="isFirst" :isLast="isLast" :idx="idx" />
    </div>
    <div class="no-result">
      <h3>Maaf, data untuk <span>"{{this.$route.params.value}}"</span> tidak tersedia</h3>
    </div>
  </fragment>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.$route.params.value} - Wibro`,
      meta: [
        { hid: 'description', name: 'description', content: `Hasil pencarian dari '${this.$route.params.value}' berhasil ditemukan  ${this.posts.length} hasil`}
      ]
    }
  },
  data() {
    return {
      linkName: 'posts-search-value-idx'
    }
  },
  async asyncData({store, params, error}) {
    const posts = await store.state.posts.filter((post) => {
      return post.postTitle.toLowerCase().includes(params.value) || post.postTags.includes(params.value)
    })

    const needPosts = 9
    let idx = params.idx - 1
    let startIdx = idx * needPosts
    let endIdx = startIdx + needPosts

    const pageidx = Math.ceil(posts.length / needPosts)

    if(params.idx > pageidx && pageidx != 0) {
      error ({
        statusCode: 404
      })
    }

    return { posts, startIdx, endIdx, needPosts }
  },
  methods: {
    back() {
      this.$router.push({ name: this.linkName, params: { value: this.$route.params.value, idx: this.idx - 1}})
    },
    next() {
      this.$router.push({ name: this.linkName, params: { value: this.$route.params.value, idx: this.idx + 1}})
    },
  },
  computed: {
    idxPosts() {
      const page = this.posts.length / this.needPosts
      return Math.ceil(page)
    },
    isFirst() {
      return this.$route.params.idx == 1
    },
    isLast() {
      return this.$route.params.idx == this.idxPosts
    },
    idx() {
      return Number(this.$route.params.idx)
    }
  }
}
</script>

<style lang="scss">
.no-result {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    max-width: 80%;
    text-align: center;
    span {
      color: #ffbf35;
    }
  }
}
</style>