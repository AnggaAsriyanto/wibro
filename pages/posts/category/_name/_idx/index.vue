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
    <div v-show="this.posts" class="paginations">
        <button @click="back" :disabled="isFirst" class="item-page">Back</button>
        <nuxt-link v-if="!isFirst" :to="{ name: linkName, params: { name: this.$route.params.name, idx: idx - 1 }}" class="item-page link">
            {{ idx - 1 }}
        </nuxt-link>
        <nuxt-link :to="{ name: linkName, params: { name: this.$route.params.name, idx: idx }}" class="item-page link">
            {{ idx }}
        </nuxt-link>
        <nuxt-link v-if="!isLast" :to="{ name: linkName, params: { name: this.$route.params.name, idx: idx + 1 }}" class="item-page link">
            {{ idx + 1 }}
        </nuxt-link>
        <button @click="next" :disabled="isLast" class="item-page">Next</button>
    </div>
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

    const category = params.name.charAt(0).toUpperCase() + params.name.slice(1)

    let idx = params.idx - 1
    let startIdx = idx * 12
    let endIdx = startIdx + 12

    return { posts, startIdx, endIdx, category }
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
          const page = this.posts.length / 12
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
.category-title {
  padding: .8rem 1rem;
  margin-bottom: 1rem;
  width: 100%;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  @media (min-width: 550px) {
    width: fit-content;
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
