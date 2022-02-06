export default function ({ store, redirect }) {
    if (store.state.posts.length === 0 && store.state.user ) {
        console.log('⏳ Getting Data..')
        return store.dispatch("getPosts")
    }
}