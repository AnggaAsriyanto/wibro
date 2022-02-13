<template>
    <div class="post-article">
        <div class="category">
            <nuxt-link :class="postCategory" to="#">{{ postCategory }}</nuxt-link>
        </div>
        <div class="title">
            <h1>{{ postTitle }}</h1>
        </div>
        <div class="info">
            <small>Published by {{ postAuthor }}</small>
            <small>{{ new Date().toLocaleString("id", { dateStyle: "long" }) }}</small>
        </div>
        <div class="img-container">
            <img :src="postImageFileURL" :alt="postImageName">
        </div>
        <div class="content-html" v-html="postHTML">
        </div>
        <!-- <div class="adv">

        </div> -->
        <div class="tag-cont">
            <div>
                <small>Tag :</small>
            </div>
            <div class="tag-list">
                <span v-for="(postTag, idx) in postTags" :key="idx">#{{ postTag.trim() }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "Post Preview | Wibro",
            meta: [
                { hid: "description", name: "description", content: "preview content untuk dipublish di wibro"}
            ]
        }
    },
    computed: {
        postCategory() {
            return this.$store.state.postCategory
        },
        postTitle() {
            return this.$store.state.postTitle
        },
        postAuthor() {
            return this.$store.state.profileUsername
        },
        postHTML() {
            return this.$store.state.postHTML
        },
        postImageFileURL() {
            return this.$store.state.postImageFileURL
        },
        postImageName() {
            return this.$store.state.postImageName
        },
        postTags() {
            const tags = this.$store.state.postTags
            return tags.split(',')
        }
    }
}
</script>