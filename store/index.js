export const state = () => ({
    posts: [],
    postsLoad: null,
    postHTML: 'Write here..',
    postTitle: '',
    postImageName: '',
    postImageFileURL: null,
    postImagePreview: null,
    postCategory: 'news',
    postTags: '',
    postTimeRead: 1,
    postMetaDesc: '',
    editPost: null,
    inPreview: null,
    user: null,
    isAnonymous: null,
    isAdmin: null,
    profileUsername: null,
    profileEmail: null,
    profilePhoto: null,
    profilePhotoName: '',
    profileId: null,
    isBar: null,
    isInfoUser: null,
})

export const getters = {
    postsFeeds(state) {
        return state.posts.slice(0,9)
    },
    postsIdx: (state) => (payload) => {
        let idx = payload - 1
        let startIdx = idx * 12
        let endIdx = startIdx + 12
        return state.posts.slice(startIdx, endIdx)
    }
}

export const mutations = {
    setProfileInfo(state, doc) {
        state.user = true;
        state.isAdmin = doc.data().admin;
        state.profileId = doc.id;
        state.profileEmail = doc.data().email;
        state.profilePhoto = doc.data().photo;
        state.profilePhotoName = doc.data().photoName;
        state.profileUsername = doc.data().username;
        console.log('🖐 Hi', state.profileUsername)
    },
    clearProfileInfo(state) {
        state.user = null;
        state.isAdmin = null;
        state.profileId = null;
        state.profileEmail = null;
        state.profilePhoto = null;
        state.profilePhotoName = '';
        state.profileUsername = null;
    },
    updateAdminStatus(state) {
        state.isAdmin = true
    },
    updateProfilePhoto(state, payload) {
        state.profilePhoto = payload
    },
    updateProfilePhotoName(state, payload) {
        state.profilePhotoName = payload
    },
    fileNameChange(state, payload) {
        state.postImageName = payload
        console.log(payload)
    },
    createFileURL(state, payload) {
        state.postImageFileURL = payload
        console.log("create URL", payload)
    },
    openImagePreview(state) {
        state.postImagePreview = !state.postImagePreview
    },
    updatePostTitle(state, payload) {
        state.postTitle = payload
        console.log(payload)
    },
    updatePostCategory(state, payload) {
        state.postCategory = payload
        console.log(payload)
    },
    updatePostTags(state, payload) {
        state.postTags = payload
        console.log(payload)
    },
    updatePostTimeRead(state, payload) {
        state.postTimeRead = payload
        console.log(payload)
    },
    updatePostMetaDesc(state, payload) {
        state.postMetaDesc = payload
        console.log(payload)
    },
    updatePostHTML(state, payload) {
        state.postHTML = payload
    },
    addPost(state, payload) {
        state.posts.push(payload)
    },
    filterPost(state, payload) {
        state.posts = state.posts.filter((post) => post.postId !== payload)
    },
    load(state) {
        state.postsLoad = true
    },
    unload(state) {
        state.postsLoad = false
    },
    preview(state) {
        state.inPreview = true
    },
    unPreview(state) {
        state.inPreview = false
    },
    resetPostState(state) {
        state.postTitle = ''
        state.postImageFileURL = null
        state.postImageName = ''
        state.postHTML = 'Write here..'
        state.postCategory = 'news'
        state.postTags = ''
        state.postTimeRead = 1
        state.postMetaDesc = ''
    },
    setPostState(state, payload) {
        state.postTitle = payload.postTitle
        state.postImageFileURL = payload.postCoverImage
        state.postImageName = payload.postCoverImageName
        state.postHTML = payload.postHTML
        state.postCategory = payload.postCategory
        state.postTags = payload.postTags
        state.postTimeRead = payload.postTimeRead
        state.postMetaDesc = payload.postMetaDesc
    },
    thisAnonymous(state) {
        state.isAnonymous = true
    },
    notAnonymous(state) {
        state.isAnonymous = false
    },
    toggleBar(state) {
        state.isBar = !state.isBar
    },
    toggleInfoUser(state) {
        state.isInfoUser = !state.isInfoUser
    },
    resetBarInfoUser(state) {
        state.isBar = false
        state.isInfoUser = false
    },
    userAnonymous(state) {
        state.user = true
    }
}

export const actions = {
    async getCurrentUser({state, commit, dispatch}, payload) {
        const database = await this.$fire.firestore.collection("users").doc(payload)
        try {
            const dbResults = await database.get()
            commit("setProfileInfo", dbResults) 
        }
        catch(err) {
            console.log('error:', err)
        }
    },
    async getPosts({ state, commit }) {
        commit("load");
        const database = await this.$fire.firestore.collection("posts").orderBy("date", "desc")
        const dbResults = await database.get()
        dbResults.forEach((doc) => {
            if(!state.posts.some((post) => post.postId === doc.id)) {
                const data = {
                    postId: doc.data().postId,
                    postAuthor: doc.data().postAuthor,
                    postTitle: doc.data().postTitle,
                    postCoverImage: doc.data().postCoverImage,
                    postCoverImageName: doc.data().postCoverImageName,
                    postCategory: doc.data().postCategory,
                    postTags: doc.data().postTags,
                    postTimeRead: doc.data().postTimeRead,
                    postMetaDesc: doc.data().postMetaDesc,
                    postHTML: doc.data().postHTML,
                    postDate: doc.data().date
                }
                commit("addPost", data)
            }
        });
        commit("unload")
        console.log("✅ Get Data")
    },
    async updatePost({commit, dispatch}, payload) {
        commit("filterPost", payload)
        await dispatch("getPosts")
    },
    async deletePost({ commit }, payload) {
        const getPost = await this.$fire.firestore.collection("posts").doc(payload)
        await getPost.delete()
        commit("filterPost", payload)
    },
    async isAnonymous({commit}) {
        await this.$fire.auth.signInAnonymously()
        .then(() => {
            console.log('🍕 Run No User')
            commit('userAnonymous')
            return;
        })
        .catch((err) => {
            console.log(err)
        })
    },
    async onAuthStateChangedAction({ state, commit, dispatch, res }, authUser ) {
        console.log('state-changed')
        console.log(authUser)

        const user = await this.$fire.auth.currentUser
        
        if(!authUser || !authUser.email || user === null) {
            commit('clearProfileInfo')
            await dispatch("isAnonymous")
            return
        }

        console.log('pass')
        await dispatch('getCurrentUser', authUser.uid)
    },
    async nuxtServerInit({ state, dispatch, commit }, { res }) {
        if (res && res.locals && res.locals.user ) {
          const { allClaims: claims, idToken: token, ...authUser } = res.locals.user

          await dispatch("onAuthStateChangedAction",  authUser )
          return     
        }

        await dispatch("onAuthStateChangedAction",  null )
        return
    }
}