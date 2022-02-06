export default function ({ store, redirect }) {
    if (!store.state.profileUsername) {
        return redirect('/users/login')
    }
}