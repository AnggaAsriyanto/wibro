export default function ({ store, redirect }) {
    if (store.state.user) {
        return redirect('/')
    }
    console.log(store.state.user)
}