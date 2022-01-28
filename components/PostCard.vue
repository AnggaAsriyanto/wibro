<template>
  <section class="post-card">
      <div class="img-post">
          <div class="img-container">
              <img v-if="post.postCoverImage" :src="post.postCoverImage" :alt="post.postCoverImageName">
			  <ImageLoad v-else />
          </div>
      </div>
      <div class="info-post">
          <article>
              <div class="category">
                <NuxtLink :class="post.postCategory" to="/">{{ post.postCategory}}</NuxtLink>
              </div>
              <h1>{{ post.postTitle }}</h1>
              <div class="detail-info">
                  <small><span><i class="fas fa-clock"></i></span>{{ new Date(post.postDate).toLocaleString("id", { dateStyle: "long"}) }}</small>
                  <small><span><i class="fas fa-book-open"></i></span>{{ post.postTimeRead }} menit</small>
              </div>
          </article>
      </div>
  </section>
</template>

<script>
export default {
	props: ['post']
}
</script>

<style lang="scss">
.post-card {
	height: 55vh;
	min-height: 300px;
	max-height: 400px;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	border-radius: 0 0 5px 5px;
	overflow: hidden;
	cursor: pointer;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    @media (max-width: 350px) {
	    height: 60vh;
	}
	@media (min-width: 550px) {
		max-height: 350px;
	}
	.img-post {
		position: relative;
		width: 100%;
		flex: auto;
		height: 60%;
	}
	.img-container {
		width: 100%;
		height: 100%;
		background-color: beige;
	}
	.category {
		margin-bottom: .7rem;
		@media (min-width: 550px) {
			margin-bottom: .5rem;
		}
	}
	h1 {
		font-size: 1.2rem;
		line-height: 1.60rem;
		color: rgb(43, 43, 43);
        @media (min-width: 550px) {
            font-size: 1rem;
			line-height: 1.5rem;
        }
	}
	small {
		font-size: 0.7rem;
	}
	hr {
		width: 10%;
		height: 9px;
		background-color: rgb(250, 187, 71);
		border: none;
		margin-bottom: 0.4rem;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.info-post {
		width: 100%;
		height: max-content;
		padding: 0.8rem;
	}
	.detail-info {
		display: flex;
		justify-content: space-between;
		margin-top: 0.8rem;
		margin-bottom: .5rem;
		@media (min-width: 550px) {
			margin-bottom: 0;
		}
		small {
			color: rgba(0, 0, 0, 0.55);
            @media (min-width: 550px) {
				font-size: 0.55rem;
            }
		}
		span {
			margin-right: 0.3rem;
			color: rgb(214, 214, 214);
		}
	}
}

</style>