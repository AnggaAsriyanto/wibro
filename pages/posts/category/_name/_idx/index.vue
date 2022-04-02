<template>
  <fragment>
    <div :class="`category-title ${this.$route.params.name}`">
      <h3>{{ this.$route.params.name }}</h3>
      <small v-if="this.$route.params.name === 'news'">
        Berita terbaru seputar dunia anime!
      </small>
      <small v-if="this.$route.params.name === 'chart'">
        Kumpulan daftar anime yang diurutkan dalam satu tema menarik!
      </small>
      <small v-if="this.$route.params.name === 'review'">
        Mereview dan membahas anime secara objectif dan mendalam.
      </small>
      <small v-if="this.$route.params.name === 'curious'">
        Mempertanyakan dan menjawab pertanyaan seputar anime!
      </small>
      <small v-if="this.$route.params.name === 'opinion'">
        Pendapat personal penulis tentang suatu topik yang dibahas.
      </small>
      <small v-if="this.$route.params.name === 'hot18'">
        Category khusus 18+ tidak boleh kurang.
      </small>
    </div>
    <div v-show="this.posts" class="post-card-list">
      <div
      v-for="(post, idx) in this.posts.slice(this.startIdx, this.endIdx)" 
      :key="idx"
      >
        <PostCard :post="post" />
      </div>
    </div>
    <Pagination v-show="this.posts" :linkName="linkName" :back="back" :next="next" :isFirst="isFirst" :isLast="isLast" :idx="idx" />
  </fragment>
</template>

<script>
export default {
  head() {
    return {
      title: `Anime Category ${this.category} | Wibro`,
      link: [
        { rel: "canonical", href: `https://wibro.site/${this.$route.params.name}/${this.$route.params.idx}`}
      ],
      meta: [
        { hid: "description", name: "description", content: `Daftar Anime Category ${this.$route.params.name}, Jelajahi Category Posts Wibro`}
      ]
    }
  },
  data() {
    return {
      linkName: 'posts-category-name-idx'
    }
  },
  async asyncData({params, store, error}) {
    let posts = []

    await store.state.posts.forEach(post => {
      if(post.postCategory === params.name) {
        posts.push(post)
      }
    });

    // total index based on post has found
    const pageidx = Math.ceil(posts.length / 12)

    if(
        posts.length === 0 ||
        params.idx > pageidx || 
        params.idx <= 0 || 
        params.idx.toLowerCase() != params.idx.toUpperCase()) 
        {
        return error ({
          statusCode: 404
        })
    }

    // change the first letter into uppercase
    const category = params.name.charAt(0).toUpperCase() + params.name.slice(1)

    // limit post in one page category
    const needPosts = 12
    let idx = params.idx - 1
    let startIdx = idx * needPosts
    let endIdx = startIdx + needPosts

    return { posts, startIdx, endIdx, category, needPosts }
  },
  methods: {
    back() {
        this.$router.push({ name: this.linkName, params: { name: this.$route.params.name, idx: this.idx - 1}})
    },
    next() {
        this.$router.push({ name: this.linkName, params: { name: this.$route.params.name, idx: this.idx + 1}})
    },
  },
  computed: {
      idxPosts() {
          const page = this.posts.length / this.needPosts
          return Math.ceil(page)
      },
      isFirst() {
          // true if user is in page number one
          return this.$route.params.idx == 1
      },
      isLast() {
          // tru if user is on the last page
          return this.$route.params.idx == this.idxPosts
      },
      idx() {
          return Number(this.$route.params.idx)
      }
    }
}
</script>

<style lang="scss">
.category-title {
  padding: .8rem 1rem;
  margin: 0 1rem 1rem;
  width: auto;
  border: 1px solid #fff;
  border-radius: 3px;
  color: #fff;
  @media (min-width: 550px) {
    width: fit-content;
    margin: 0 0 1rem;
  }
  &.news {
    background-color: rgb(15, 138, 253)
  }
  &.chart {
    background-color: #ffbc04;
  }
  &.review {
    background-color: #13ccad;
  }
  &.curious {
    background-color: #d43391;
  }
  &.opinion {
    background-color: #9927e6;
  }
  &.hot18 {
    background-color: #fc01da;
  }
  h3 {
    text-transform: uppercase;
  }
}
</style>
