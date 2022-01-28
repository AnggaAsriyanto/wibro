export default function ({ store }) {
    if (store.state.posts.length === 0) {
        console.log('⏳ Getting Data..')
        return store.dispatch("getPosts")
    }
}