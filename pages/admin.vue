<template>
     <form @submit.prevent="handleAdmin" class="admin">
        <div class="title-form">
            <h1>Admin</h1>
        </div>
        <div>
            <label for="admin-code">Admin Code</label>
            <input v-model.trim="adminCode" @click="removeError" id="admin-code" type="text" autocomplete="off" required>
        </div>
        <small v-if="error" class="error small">{{ error }}</small>
        <button class="submit">Submit</button>
    </form>
</template>

<script>
export default {
    middleware: 'isLogin',
    layout: 'center',
    head() {
        return {
            title: 'Admin | Wibro',
            meta: [
                { hid: "description", name: "description", content: "Admin code verified untuk situs wibro"}
            ]
        }
    },
    data() {
        return {
            adminCode: '',
            error: null,
        }
    },
    methods: {
        async handleAdmin() {
            // get code on database
            const res = await this.$fire.firestore.collection("admin").doc(this.adminCode)
            const resResults = await res.get()
            // check the code is match
            if(resResults.data()) {
                // check if the code not has been used
                if(!resResults.data().user) {
                    const user = await this.$fire.firestore.collection("users").doc(this.$store.state.profileId)
                    await user.update({
                        admin: true
                    })

                    await res.update({
                        user: this.$store.state.profileUsername
                    })

                    await this.$store.commit('updateAdminStatus')
                    await this.$router.push('/')
                    setTimeout(() => {
                        window.location.reload()
                    }, 500);
                    return
                }

                this.error = "You don't have permission for this code!!"
                return
            }

            this.error = 'Your code is invalid!!'
            return
        },
        removeError() {
            this.error = null
        }
    }
}
</script>