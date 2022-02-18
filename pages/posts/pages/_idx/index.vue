<template>
    <fragment>
        <div class="page-desc">
            <small>Page {{ this.idx }} of {{ this.idxPosts }} </small>
            <small>{{ this.posts.length}} posts</small>
        </div>
        <div v-show="this.posts" class="post-card-list">
            <div
            v-for="(post, idx) in this.posts" 
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
            linkName: 'posts-pages-idx',
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
            this.$router.push({ name: this.linkName, params: { idx: this.idx - 1}})
        },
        next() {
            this.$router.push({ name: this.linkName, params: { idx: this.idx + 1}})
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
