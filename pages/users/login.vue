<template>
    <form @submit.prevent="logIn" autocomplete="off">
        <div class="title-form">
            <h1>Login</h1>
        </div>
        <div>
            <label for="email">Email</label>
            <input @click="removeError" v-model="email" id="email" type="email" required>
        </div>
        <div class="pass-cont">
            <label for="password">Password</label>
            <input 
            @click="removeError"
            v-model="password"
            id="password"
            :type="passType"
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
        <button class="submit">Login</button>
        <div class="alt-form">
            <small>Belum punya akun? <nuxt-link :to="{ name: 'users-register' }">Daftar</nuxt-link></small>
        </div>
    </form>
</template>

<script>
export default {
    middleware: 'login',
    layout: 'center',
    head() {
        return {
            title: 'Login | Wibro'
        }
    },
    data() {
        return {
            clicked: null,
            passType: 'password',
            email: '',
            password: '',
            error: null
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
        async logIn() {
            try {
                const res = await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password)

                if(res) {
                    await this.$router.push('/')
                    await this.$nuxt.refresh()
                    return
                }

            } catch(err) {
                this.error = 'Email atau password anda tidak sesuai'
                this.password = ''
            }
        },
        removeError() {
            this.error = null
        }
    }
}
</script>