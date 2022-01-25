<template>
    <fragment>
        <div class="post-article" v-if="currentPost.length === 1">
            <Conf v-if="isConf" :cancle="cancle" :deletePost="deletePost" :postTitle="currentPost[0].postTitle" />
            <div class="category">
                <nuxt-link :class="currentPost[0].postCategory" to="#">{{ currentPost[0].postCategory }}</nuxt-link>
            </div>
            <div class="title">
                <h1>{{ currentPost[0].postTitle }}</h1>
            </div>
            <div class="info">
                <small>Published by {{ currentPost[0].postAuthor }}</small>
                <small>{{ new Date(currentPost[0].postDate).toLocaleString("id", { dateStyle: "long"}) }}</small>
            </div>
            <div class="img-container">
                <img :src="currentPost[0].postCoverImage" alt="">
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
                    <ShareNetwork network="messenger" :url="url" :title="title" class="st-custom-button"><span><i class="fab fa-facebook-messenger"></i></span></ShareNetwork>
                </div>
            </div>
            <!-- <div class="other-posts">
                <h3>Article lainnya</h3>
                <div class="content">
                    <div class="other-post">
                        <div class="img-cont">
                            <img v-if="otherPost.postCoverImage" :src="otherPost.postCoverImage" :alt="otherPost.postCoverImageName">
                        </div>
                        <div class="info-op">
                            <div class="title">
                                <h4>{{ otherPost.postTitle }}</h4>
                            </div>
                            <div class="detail">
                                <small><span><i class="fas fa-book-open"></i></span>{{ otherPost.postTimeRead }} menit</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            <div v-if="$store.state.isAdmin" class="admin-opt">
                <div class="admin-btn">
                    <nuxt-link :to="{ name: 'edit-post-id-title', params: { id: currentPost[0].postId, title: currentPost[0].postTitle.replace(/\s+/g, '-').toLowerCase() }}" class="post-tools edit"><span><i class="fas fa-pen"></i></span> Edit Post</nuxt-link>
                    <button @click="deleteConf" class="post-tools delete"><span><i class="far fa-trash-alt"></i></span> Delete Post</button>
                </div>
            </div>
        </div>
        <Loading v-else />
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
