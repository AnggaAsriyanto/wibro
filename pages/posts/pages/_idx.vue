<template>
    <fragment>
        <div v-if="!loading" class="post-card-list">
            <nuxt-link
            rel=canonical
            v-for="(post, idx) in postsIdx" 
            :key="idx"
            :to="{ name: 'posts-id-title', params: { title: post.postTitle.replace(/\s+/g, '-').toLowerCase(), id: post.postId } }">
            <client-only>
                <PostCard v-if="post" :post="post" />
            </client-only>
            </nuxt-link>
        </div>
        <div v-if="!loading" class="paginations">
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
        <CompLoad v-else />
    </fragment>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
        }
    },
    created() {
        if(this.idx > this.idxPosts || this.idx <= 0) {
            this.$router.push({ name: 'posts-pages-idx', params: { idx: 1 }})
        }
    },
    mounted() {
        this.loading = false
        this.idxPosts
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
        postsIdx() {
            return this.$store.getters.postsIdx(this.idx)
        },
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

<style lang="scss">
.paginations {
    display: flex;
    justify-content: center;
    margin: 2rem 0 1rem;
    .item-page {
        background-color: transparent;
        font-family: inherit;
        padding: .5rem 1rem;
        border: 1px solid #dfdfdf;
        cursor: pointer;
        text-decoration: none;
    }
    .item-page.link {
        color: #000;
    }
    .item-page.link.nuxt-link-active {
        color: #1fb8e6;
    }
}
</style>