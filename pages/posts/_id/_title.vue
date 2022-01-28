<template>
    <fragment>
        <client-only>
        <article class="post-article" v-if="currentPost.length === 1">
            <Conf v-if="isConf" :cancle="cancle" :deletePost="deletePost" :postTitle="currentPost[0].postTitle" />
            <div class="category">
                <nuxt-link :class="category" to="#">{{ category }}</nuxt-link>
            </div>
            <div class="title">
                <h1>{{ title }}</h1>
            </div>
            <div class="info">
                <small>Published by {{ author }}</small>
                <small>{{ new Date(currentPost[0].postDate).toLocaleString("id", { dateStyle: "long"}) }}</small>
            </div>
            <div class="img-container">
                <img :src="image" :alt="currentPost[0].postCoverImageName">
            </div>
            <div class="intro">
                <small>{{ title }}</small>
            </div>
            <div class="content-html" v-html="currentPost[0].postHTML">
            </div>
            <!-- <div class="adv">

            </div> -->
            <div class="tag-cont" ref="tag">
                <div>
                    <small>Tags :</small>
                </div>
                <div class="tag-list">
                    <span v-for="(postTag, idx) in postTags" :key="idx">#{{ postTag.trim() }}</span>
                </div>
            </div>
            <div :class="{ share: true, show: show}">
                <small>Bagikan ke:</small>
                <div class="social-media">
                    <ShareNetwork network="whatsapp" :url="url" :title="title" class="st-custom-button"><span><i class="fab fa-whatsapp"></i></span></ShareNetwork>
                    <ShareNetwork network="twitter" :url="url" :title="title" class="st-custom-button"><span><i class="fab fa-twitter"></i></span></ShareNetwork>
                    <ShareNetwork network="facebook" :url="url" :title="title" :description="description" :hashtags="currentPost[0].postTags" class="st-custom-button" ><span><i class="fab fa-facebook-f"></i></span></ShareNetwork>
                    <ShareNetwork network="telegram" :url="url" :title="title" class="st-custom-button"><span><i class="fab fa-telegram"></i></span></ShareNetwork>
                </div>
            </div>
            <div v-if="$store.state.isAdmin" class="admin-opt">
                <div class="admin-btn">
                    <nuxt-link :to="{ name: 'edit-post-id-title', params: { id: currentPost[0].postId, title: currentPost[0].postTitle.replace(/\s+/g, '-').toLowerCase() }}" class="post-tools edit"><span><i class="fas fa-pen"></i></span> Edit Post</nuxt-link>
                    <button @click="deleteConf" class="post-tools delete"><span><i class="far fa-trash-alt"></i></span> Delete Post</button>
                </div>
            </div>
        </article>
        <Loading v-else />
        </client-only>
    </fragment>
</template>

<script>
export default {
    head() {
        return {
            title: this.currentPost[0].postTitle,
            meta: [
                { hid: "description", name: "description", content: this.description },
                { name: "twitter:card", content: "summary" },
                { property: "og:type", content: "article" },
                { property: "og:url", content: this.url },
                { property: "og:title", content: this.title },
                { property: "og:description", content: this.description },
                { property: "og:image", content: this.image },
            ]
        }
    },
    data() {
        return {
            currentPost: null,
            isConf: null,
            isShareThisLoaded: null,
            description: '',
            url: null,
            title: '',
            image: null,
            author: '',
            category: '',
            show: null,
            footerNum: null,
        }
    },
    created() {
        this.currentPost = this.$store.state.posts.filter((post) => {
            return post.postId === this.$route.params.id
        })

        this.description = this.currentPost[0].postMetaDesc
        this.url = `http://localhost:300${this.$route.path}`
        this.title = this.currentPost[0].postTitle
        this.image = this.currentPost[0].postCoverImage
        this.category = this.currentPost[0].postCategory
        this.author = this.currentPost[0].postAuthor
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll )
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll )
    },
    methods: {
        async deletePost() {
            this.$store.dispatch("deletePost", this.currentPost[0].postId)
            await this.$router.push('/')
            this.$nuxt.refresh()
        },
        deleteConf() {
            this.isConf = true
        },
        cancle() {
            this.isConf = false
        },
        handleScroll() {
            let footerTop = this.$refs.tag.getBoundingClientRect().top
            if(footerTop < this.footerNum) {
                this.show = true
            } else {
                this.show = false
            }

            this.footerNum = footerTop
        }
    },
    computed: {
        postTags() {
            const tags = this.currentPost[0].postTags
            return tags.split(',')
        },
    }
}
</script>
