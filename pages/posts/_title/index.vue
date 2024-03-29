<template>
    <article v-show="this.post" class="post-article" lang="id" itemscope itemtype="https://schema.org/Article">
        <Conf v-show="isConf" :cancle="cancle" :deletePost="deletePost" :postTitle="post[0].postTitle" />
        <div class="category">
            <nuxt-link :class="post[0].postCategory" aria-label="category" :to="{ name: 'posts-category-name-idx', params: { name: post[0].postCategory, idx: '1'}}"><span itemprop="about">{{ post[0].postCategory }}</span></nuxt-link>
        </div>
        <div class="title">
            <h1 itemprop="name">{{ post[0].postTitle }}</h1>
        </div>
        <div class="info">
            <small>Published by <span itemprop="author">{{ post[0].postAuthor }}</span></small>
            <small itemprop="datePublished">{{ date }}</small>
        </div>
        <div class="img-container">
            <nuxt-img itemprop="image" format="webp" sizes="xl:100vw lg:100vw md:100vw sm:100vw xs:100vw" :src="post[0].postCoverImage" :alt="post[0].postCoverImageName"  />
        </div>
        <div class="intro">
            <small>{{ post[0].postTitle }}</small>
        </div>
        <div class="content-html" itemprop="articleBody" v-html="post[0].postHTML">
        </div>
        <div class="ads">
            <Adsense
                v-if="!loading"
                data-ad-client="ca-pub-1142153237520676"
                data-ad-slot="3450190651"
                data-ad-format="auto"
                data-full-width-responsive="yes">
            </Adsense>
        </div>
        <div class="tag-cont" ref="tag">
            <div>
                <small>Tags :</small>
            </div>
            <div class="tag-list">
                <span v-for="(postTag, idx) in postTags" :key="idx">#<span itemprop="keywords">{{ postTag.trim() }}</span></span>
            </div>
        </div>
        <div :class="{ share: true, show: show}">
            <small>Bagikan ke:</small>
            <div class="social-media">
                <ShareNetwork rel="nofollow" network="whatsapp" :url="url" :title="post[0].postTitle" aria-label="whatsapp" class="st-custom-button"><span><i class="fab fa-whatsapp"></i></span></ShareNetwork>
                <ShareNetwork rel="nofollow" network="twitter" :url="url" :title="post[0].postTitle" aria-label="twitter" class="st-custom-button"><span><i class="fab fa-twitter"></i></span></ShareNetwork>
                <ShareNetwork rel="nofollow" network="facebook" :url="url" :title="post[0].postTitle" aria-label="facebook" :description="post[0].postMetaDesc" :hashtags="post[0].postTags" class="st-custom-button" ><span><i class="fab fa-facebook-f"></i></span></ShareNetwork>
                <ShareNetwork rel="nofollow" network="telegram" :url="url" :title="post[0].postTitle" aria-label="telegram" class="st-custom-button"><span><i class="fab fa-telegram"></i></span></ShareNetwork>
            </div>
        </div>
        <div v-if="this.$store.state.postViews" class="label-cont">
            <div class="label">
                <div>
                    <span><i class="far fa-eye"></i></span>
                    <small>{{this.$store.state.postViews }} dilihat</small>
                </div>
                <div class="like" @click="likePost">
                    <span v-if="!like"><i class="far fa-heart"></i></span>
                    <span class="liked" v-else><i class="fas fa-heart"></i></span>
                    <small>{{ this.$store.state.postLikes }} suka</small>
                </div>
            </div>
        </div>
        <div v-if="$store.state.isAdmin" class="admin-opt">
            <div class="admin-btn">
                <nuxt-link :to="{ name: 'edit-post-id-title', params: { id: post[0].postId, title: post[0].postTitle.replace(/\s+/g, '-').toLowerCase() }}" aria-label="edit" class="post-tools edit"><span><i class="fas fa-pen"></i></span> Edit Post</nuxt-link>
                <button @click="deleteConf" aria-label="delete-button" class="post-tools delete"><span><i class="far fa-trash-alt"></i></span> Delete Post</button>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    head() {
        return {
            title: this.post[0].postTitle,
            meta: [
                { hid: "description", name: "description", content: this.post[0].postMetaDesc },
                { name: "twitter:card", content: "summary" },
                { property: "og:type", content: "article" },
                { property: "og:url", content: this.url },
                { property: "og:title", content: this.post[0].postTitle },
                { property: "og:description", content: this.post[0].postMetaDesc },
                { property: "og:image", content: this.post[0].postCoverImage },
            ],
            link: [
                { rel: "canonical", href: `https://wibro.site${this.$route.path}` }
            ]
        }
    },
    data() {
        return {
            currentPost: null,
            isConf: null,
            url: null,
            show: null,
            footerNum: null,
            loading: true,
            like: null,
        }
    },
    async asyncData({ params, store, error, redirect }) {
        const paramsTitle = params.title.replace(/-/g, ' ')

        // search the most related title on posts state database
        const post = await store.state.posts.filter((post) => {
            let postTitle = post.postTitle.replace(/,/g, '').toLowerCase()
            return postTitle.includes(paramsTitle)
        })

        // if no post found
        if(post.length === 0) {
            await error({
                statusCode: 404
            })

            return;
        }

        // if params title doesn't match exactly with the title post founded then it will redirect again
        // until the title post and params title exactly same, like params title "go-japa" but in database
        // it should "go-japan" so it will trigger this
        const titleDash = post[0].postTitle.replace(/,/g, '').replace(/\s+/g, '-').toLowerCase()
        if(params.title !== titleDash) {
            await redirect({ name: 'posts-title', params: { title: titleDash}})

            return;
        }

        return { post }
    },
    created() {
        this.url = `https://wibro.site${this.$route.path}`
    },
    async mounted() {
        window.addEventListener('scroll', this.handleScroll)
        await this.$store.dispatch("addViews", this.post[0].postId)
        await this.$store.dispatch("getLikes", this.post[0].postId)
        this.loading = false
    },
    async beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        async deletePost() {
            // remove post button just for admin
            this.$store.dispatch("deletePost", this.post[0].postId)
            await this.$router.push('/')
            setTimeout(() => {
                window.location.reload()
            }, 500);
            this.$nuxt.refresh()
        },
        async likePost() {
            this.like = !this.like
            if(this.like) {
                await this.$store.dispatch("addLikes", this.post[0].postId)
            } else {
                await this.$store.dispatch("subtractLikes", this.post[0].postId)
            }
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
            const tags = this.post[0].postTags
            return tags.split(',')
        },
        date() {
            return new Date(this.post[0].postDate).toLocaleString("id", { dateStyle: "long"})
        }
    }
}
</script>
