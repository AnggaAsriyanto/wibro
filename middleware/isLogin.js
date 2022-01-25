export default function ({ store, redirect }) {
    if (!store.state.user) {
        console.log("You have to login first!")
        return redirect('/users/login')
    }
}