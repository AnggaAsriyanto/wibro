export default function ({ store }) {
    if (store.state.posts.length === 0) {
        console.log('getPosts from middleware')
        return store.dispatch("getPosts")
    }
}