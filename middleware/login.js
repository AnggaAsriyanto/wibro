export default function ({ store, redirect }) {
    if (store.state.profileUsername) {
        return redirect('/')
    }
    console.log(store.state.profileUsername)
}