<template>
  <form @submit.prevent="uploadPhoto">
      <div class="title-form">
          <h1>Edit Profile</h1>
      </div>
      <div class="image-cont">
          <img v-if="$store.state.profilePhoto" :src="$store.state.profilePhoto" :alt="$store.state.profilePhotoName" >
          <img v-else src="../../static/user.svg" alt="user">
      </div>
      <div class="btn-cont">
          <div>
            <label class="img-opt add" for="image-profile">
                <span v-if="$store.state.profilePhoto">Change Photo</span>
                <span v-else>Add Photo</span>
            </label>
            <button type="submit" class="img-opt">Save</button>
            <input @change="imgFile" type="file" name="image-profile" id="image-profile">
          </div>
      </div>
  </form>
</template>

<script>
export default {
    middleware: 'isLogin',
    layout: 'center',
    head() {
        return {
            title: 'Edit Profile | Wibro'
        }
    },
    data() {
        return {
            file: null,
        }
    },
    methods: {
        imgFile(e) {
            this.file = e.target.files[0]
            const filename = this.file.name
            this.$store.commit("updateProfilePhoto", URL.createObjectURL(this.file))
            this.$store.commit("updateProfilePhotoName", filename)
        },
        uploadPhoto() {
            if(this.file) {
                this.$store.commit('load')
                const storageRef = this.$fire.storage.ref()
                const docRef = storageRef.child(`documents/profilePhoto/${this.$store.state.profilePhotoName}`)
                docRef.put(this.file).on(
                    "state_changed",
                    (snapshot) => {
                        console.log(snapshot)
                    },
                    (err) => {
                        console.log(err)
                    },
                    async () => {
                        const downloadURL = await docRef.getDownloadURL()
                        const user = await this.$fire.firestore.collection("users").doc(this.$store.state.profileId)
                        await user.update({
                            photo: downloadURL,
                            photoName: this.profilePhotoName
                        })

                        await this.$store.commit('unload')
                        this.$router.push('/')
                        return
                    }
                )
                return
            }
            return
        }
    },
    computed: {
        profilePhotoName() {
            return this.$store.state.profilePhotoName
        }
    }
}
</script>

<style lang="scss">
.image-cont {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background-color: #d4d4d4;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
    }
}

.btn-cont {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    #image-profile {
        display: none;
    }
    .img-opt {
        padding: 0.4rem 1.2rem;
        margin-top: 0;
        color: #fff;
        border-radius: 0 6px 6px 0;
        font-size: 0.75rem;
        font-family: inherit;
        margin-top: 1rem;
        margin-right: -4px;
        cursor: pointer;
    }
    .img-opt.add {
        padding: 0.38rem 1.2rem;
        border-radius: 6px 0 0 6px;
        color: #14d169;
        border: solid 1px #14d169;
    }
}
</style>