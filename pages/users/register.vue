<template>
    <form @submit.prevent="register" autocomplete="off">
        <div class="title-form">
            <h1>Daftar</h1>
        </div>
        <div>
            <label for="username">Username</label>
            <input 
            @click="removeError"
            v-model.trim="username" 
            id="username" 
            type="text" minlength="4" 
            maxlength="20"
            pattern="[^\s]+"
            title="Username tidak boleh terdapat spasi"
            required>
        </div>
        <div>
            <label for="email">Email</label>
            <input v-model.trim="email" id="email" type="email" required>
        </div>
        <div class="pass-cont">
            <label for="password">Password</label>
            <input 
            v-model.trim="password"
            id="password" 
            :type="passType"
            pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Harus ada 1 huruf kecil dan 1 huruf besar, setidaknya 8 karakter"
            minlength="8" 
            maxlength="20"
            required
            >
            <span @click="togglePass" class="toggle-pass">
                <i v-if="!clicked" class="fas fa-eye"></i>
                <i v-else class="fas fa-eye-slash"></i>
            </span>
        </div> 
        <div v-if="error">
            <small class="error small">{{ error }}</small>
        </div>
        <button class="submit">Buat Akun</button>
        <div class="alt-form">
            <small>Sudah punya akun? <nuxt-link :to="{ name: 'users-login' }">Login</nuxt-link></small>
        </div>
    </form>
</template>

<script>
export default {
    middleware: 'login',
    layout: 'center',
    head() {
        return {
            title: 'Register | Wibro'
        }
    },
    data() {
        return {
            clicked: null,
            passType: 'password',
            username: '',
            email: '',
            password: '',
            error: null,
        }
    },
    methods: {
        togglePass() {
            this.clicked = !this.clicked

            if(this.passType === 'password') {
                return this.passType = 'text'
            }
            
            this.passType = 'password'
        },
        async register() {
            console.log(this.username, this.email)

            if (
                this.username !== '' &&
                this.email !== '' &&
                this.password !== ''
            ) {
                const username = await this.$fire.firestore.collection("users").where("username", "==", this.username).get()
                if(username.empty) {
                    this.$store.commit('load')
                    this.error = false
                    const firebaseAuth = await this.$fire.auth
                    const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password)
                    const result = await createUser
                    const database = this.$fire.firestore.collection("users").doc(result.user.uid)
                    await database.set({
                        username: this.username,
                        email: this.email,
                        admin: null,
                        photo: null,
                        photoName: '',
                    })
                    await this.$store.commit('unload')
                    await this.$router.push('/')
                    setTimeout(() => {
                        window.location.reload()
                    }, 500);
                    return
                }

                this.error = 'Username ini sudah tidak tersedia!'
                return
            }
        },
        removeError() {
            this.error = null
        }
    }
}
</script>