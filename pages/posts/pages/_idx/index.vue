<template>
    <fragment>
        <div v-show="this.posts" class="post-card-list">
            <div
            v-for="(post, idx) in this.posts" 
            :key="idx"
            >
                <PostCard :post="post" />
            </div>
        </div>
        <div v-show="this.posts" class="paginations">
            <button @click="back" :disabled="isFirst" class="item-page">Back</button>
            <nuxt-link v-if="!isFirst" :to="{ name: 'posts-pages-idx', params: { idx: idx - 1 }}" class="item-page link">
                {{ idx - 1 }}
            </nuxt-link>
            <nuxt-link :to="{ name: 'posts-pages-idx', params: { idx: idx }}" class="item-page link">
                {{ idx }}
            </nuxt-link>
            <nuxt-link v-if="!isLast" :to="{ name: 'posts-pages-idx', params: { idx: idx + 1 }}" class="item-page link">
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
            title: `Pages Post ${this.$route.params.idx} | Wibro`,
            link: [
                { rel: "canonical", href: `https://wibro.site/posts/pages/${this.$route.params.idx}`}
            ],
            meta: [
                { hid: "description", name: "description", content: "Lihat Posts Lebih Banyak! di Wibro"}
            ],
        }
    },
    data() {
        return {
            loading: true,
        }
    },
    middleware({store, params, redirect}) {
        const pageidx = Math.ceil(store.state.posts.length / 12)

        if(
            params.idx > pageidx || 
            params.idx <= 0 || 
            params.idx.toLowerCase() != params.idx.toUpperCase()) 
            {
            return redirect('/posts/pages/1')
        }
    },
    async asyncData({store, params}) {
        const posts = await store.getters.postsIdx(params.idx)

        return { posts }
    },
    mounted() {
        this.loading = false
    },
    methods: {
        back() {
            this.$router.push({ name: 'posts-pages-idx', params: { idx: this.idx - 1}})
        },
        next() {
            this.$router.push({ name: 'posts-pages-idx', params: { idx: this.idx + 1}})
        },
    },
    computed: {
        idxPosts() {
            const page = this.$store.state.posts.length / 12
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
