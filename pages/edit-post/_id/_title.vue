<template>
    <fragment>
        <h1>Edit Post</h1>
        <div class="post-conf">
            <div v-show="$store.state.postImagePreview" class="popup">
                <img :src="$store.state.postImageFileURL" :alt="$store.state.postImageName">
            </div>
            <div class="post-content">
                <div class="header">
                    <div class="title-post">
                        <input v-model.trim="postTitle" type="text" placeholder="Add title post..">
                    </div>
                    <div class="upload-file">
                        <label for="img-file" class="item">Upload Cover Image</label>
                        <input id="img-file" ref="postImage" @change="fileChange" type="file" accept=".png, .jpg, .jpeg">
                        <button class="item preview" @click="openPreview" :disabled="!$store.state.postImageFileURL">Preview Image</button>
                    </div>
                    <div>
                        <span>File Chosen: {{ $store.state.postImageName }} </span>
                    </div>
                </div>
                <div class="info-post">
					<label for="tags">Category, Tags dan Waktu dihabiskan untuk membaca: </label>
					<div>
						<div>
							<select v-model="postCategory" id="category" class="info-input select">
								<option value="news">news</option>
								<option value="chart">chart</option>
								<option value="review">review</option>
								<option value="curious">curious</option>
								<option value="opinion">opinion</option>
								<option value="hot18">hot18</option>
							</select>
						</div>
						<div>
							<input v-model.trim="postTags" type="text" id="tags" class="info-input" placeholder="Add Tags..">
						</div>
						<div class="time-read">
							<input v-model="postTimeRead" type="number" name="read-time" id="read-time" min="1" max="10">
							<span>menit</span>
						</div>
						<div>
							<input v-model="postMetaDesc" type="text" class="info-input desc" placeholder="description meta.." spellcheck="false" autocomplete="off">
						</div>
					</div>
                </div>
                <div class="main-post">
                    <client-only>
                        <vue-editor :editorOptions="editorSettings" v-model="postHTML" useCustomImageHandler @image-added="imageHandler" spellcheck="false"></vue-editor>
                    </client-only>
                </div>
            </div>
            <div>
				<button @click="updatePost" class="item post">Update Post</button>
				<nuxt-link :to="{ name: 'post-preview' }" class="item preview">Preview Post</nuxt-link>
                <small v-if="error" class="error small">{{ error }}</small>
            </div>
        </div>
    </fragment>
</template>

<script>
export default {
    middleware: 'isAdmin',
    layout: 'center',
    data() {
        return {
			file: null,
			fileImageChange: null,
			error: null,
			routeId: null,
			currentPost: null,
			editorSettings: {
				modules: {
					imageResize: {}
				}
			}
        }
    },
	async created() {
		this.routeId = this.$route.params.id
		this.currentPost = await this.$store.state.posts.filter((post) => {
			return post.postId === this.routeId
		})

		if(!this.$store.state.inPreview) {
			console.log('get call')
			this.$store.commit("setPostState", this.currentPost[0])
			await this.$store.commit("preview")
		}
	},
	methods: {
		async fileChange(e) {
			this.error = null
			this.fileImageChange = true,
			console.log('fc')
			this.file = e.target.files[0]
			const filename = this.file.name
			await this.$store.commit('fileNameChange', filename)
			await this.$store.commit('createFileURL', URL.createObjectURL(this.file))
		},
		openPreview() {
			this.$store.commit('openImagePreview')
		},
		imageHandler(file, Editor, cursorLocation, resetUploader) {
			const storageRef = this.$fire.storage.ref()
			const docRef = storageRef.child(`documents/postImages/${file.name}`)
			docRef.put(file).on(
				"state_changed",
				(snapshot) => {
					console.log(snapshot)
				},
				(err) => {
					console.log(err)
				},
				async () => {
					const downloadURL = await docRef.getDownloadURL()
					Editor.insertEmbed(cursorLocation, "image", downloadURL)
					resetUploader()
				}
			)
		},
		async updatePost() {
			const database = await this.$fire.firestore.collection("posts").doc(this.routeId)
			if(this.postTitle.length !== 0 && this.postHTML.length !== 0) {
					this.$store.commit('load')
					const storageRef = this.$fire.storage.ref()
					if(this.fileImageChange) {
						const docRef = storageRef.child(`documents/postCoverImages/${this.$store.state.postImageName}`)
						docRef.put(this.file).on(
							"state_changed",
							(snapshot) => {
								console.log(snapshot)
							},
							(err) => {
								console.log(err)
							},
							async () => {
								const downloadURL = await docRef.getDownloadURL()

								await database.update({
									postTitle: this.postTitle,
									postCoverImage: downloadURL,
									postCoverImageName: this.postCoverImageName,
									postCategory: this.postCategory,
									postTags: this.postTags,
									postTimeRead: this.postTimeRead,
									postMetaDesc: this.postMetaDesc,
									postHTML: this.postHTML,
								})

								console.log('image updated')
								await this.$store.dispatch("updatePost", this.routeId)
								await this.$store.commit('unload')
								this.$store.commit("unPreview")
								this.$router.push('/')
								return;
							}
						)
					}

					console.log('updated')

					await database.update({
						postTitle: this.postTitle,
						postCategory: this.postCategory,
						postTags: this.postTags,
						postTimeRead: this.postTimeRead,
						postMetaDesc: this.postMetaDesc,
						postHTML: this.postHTML,
					})

					await this.$store.dispatch("updatePost", this.routeId)
					await this.$store.commit('unload')
					this.$store.commit("unPreview")
					this.$router.push('/')
					return
			}
			this.error = "Pastikan anda menuliskan title dan content post!"
			return
		}
	},
	computed: {
		postTitle: {
			get() {
				return this.$store.state.postTitle
			},
			set(payload) {
				this.$store.commit("updatePostTitle", payload)
				this.error = false
			}
		},
		postCoverImageName() {
			return this.$store.state.postImageName
		},
		postCategory: {
			get() {
				return this.$store.state.postCategory
			},
			set(payload) {
				this.$store.commit("updatePostCategory", payload)
			}
		},
		postTags: {
			get() {
				return this.$store.state.postTags
			},
			set(payload) {
				this.$store.commit("updatePostTags", payload)
			}
		},
		postTimeRead: {
			get() {
				return this.$store.state.postTimeRead
			},
			set(payload) {
				this.$store.commit("updatePostTimeRead", payload)
			}
		},
		postMetaDesc: {
			get() {
				return this.$store.state.postMetaDesc
			},
			set(payload) {
				this.$store.commit("updatePostMetaDesc", payload)
			}
		},
		postHTML: {
			get() {
				return this.$store.state.postHTML
			},
			set(payload) {
				this.$store.commit("updatePostHTML", payload)
			}
		}
	}
}
</script>
