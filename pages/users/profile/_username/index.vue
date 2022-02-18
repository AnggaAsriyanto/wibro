<template>
  <div class="profile">
      <div>
          <div class="box-profile">
            <div class="img-container">
                <img loading="lazy" v-if="$store.state.profilePhoto" :src="$store.state.profilePhoto" :alt="$store.state.profilePhotoName">
                <img v-else src="../../../../static/user.svg" alt="user">
            </div>
            <div>
                <div class="status">
                    <small class="admin" v-if="this.$store.state.isAdmin">Admin</small>
                    <small class="user" v-else>User</small>
                </div>
                <div class="username">
                    <h2>{{ this.$store.state.profileUsername}}</h2>
                </div>
            </div> 
          </div>  
          <hr>
          <div class="features">
              <div v-if="this.$store.state.isAdmin">
                  <nuxt-link :to="{ name: 'create-post'}">Create Post</nuxt-link>
              </div>
              <div>
                  <nuxt-link :to="{ name: 'users-edit-profile'}">Edit Profile</nuxt-link>
              </div>
          </div>
      </div>  
  </div>
</template>

<script>
export default {
    layout: 'cwn',
    middleware({ redirect, store, params}) {
        if(!store.state.profileUsername || params.username !== store.state.profileUsername) {
            return redirect('/')
        }
    },
    head() {
        return {
            title: `${this.$store.state.profileUsername} | Wibro`,
            meta: [
                { hid: 'description', name: 'description', content: `Profile ${this.$store.state.profileUsername} username`}
            ]
        }
    }
}
</script>

<style lang="scss">
.profile {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    >div {
        max-width: 100%;
        box-shadow: 0 0 7px 0.1px #e7e7e7;
        border-radius: 10px;
    }
    .box-profile {
        display: flex;
        align-items: center;
        padding: 1.5rem;
        div {
            margin: 0 0.5rem;
        }
    }
    hr {
        margin: 0 auto;
        width: 80%;
        height: 1px;
        background-color: #c7c7c7;
        border: none;
    }
    .features {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: .5rem;
        padding-top: .5rem;
        >div {
            width: 80%;
            display: flex;
            justify-content: center;
        }
        a {
            padding: .5rem;
            font-weight: 400;
            font-size: .8rem;
            text-decoration: none;
        }
    }
    .img-container {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .status {
        .admin {
            color: #ffbf35;
        }
        .user {
            color: #02ec3d;
        }
    }
}
</style>