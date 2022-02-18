<template>
  <section class="post-card">
      <div class="img-post">
          <div class="img-container">
              <nuxt-img v-if="post.postCoverImage" loading="lazy" format="webp" sizes="xl:100vw lg:100vw md:100vw sm:100vw xs:100vw" :src="post.postCoverImage" :alt="post.postCoverImageName"/>
			  <ImageLoad v-else />
			  <nuxt-link
			  class="new-tab"
			  target="_blank"
			  :to="{ name: 'posts-title', params: { title: link } }"
			  ><span><i class="fas fa-share"></i></span></nuxt-link>
          </div>
      </div>
      <div class="info-post">
          <article>
              <div class="category">
                <NuxtLink :class="post.postCategory" :to="{ name: 'posts-category-name-idx', params: { name: post.postCategory, idx: '1'}}">{{ post.postCategory}}</NuxtLink>
              </div>
			  <nuxt-link
			  :to="{ name: 'posts-title', params: { title: link } }"
			  ><h1>{{ post.postTitle }}</h1></nuxt-link>
              <div class="detail-info">
                  <small><span><i class="fas fa-calendar-check"></i></span>{{ date }}</small>
                  <small><span><i class="fas fa-clock"></i></span>{{ post.postTimeRead }} menit</small>
              </div>
          </article>
      </div>
  </section>
</template>

<script>
export default {
	props: ['post'],
	computed: {
		link() {
			return this.post.postTitle.replace(/\s+/g, '-').replace(/,/g, '').toLowerCase()
		},
		date() {
			return new Date(this.post.postDate).toLocaleString("id", { dateStyle: "long"})
		}
	}
}
</script>

<style lang="scss">
.post-card {
	height: 55vh;
	min-height: 300px;
	max-height: 400px;
	margin: .3rem 1.2rem;
	background-color: #ffffff;
	border-radius: 0 0 5px 5px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	cursor: pointer;
	box-shadow: 0 0 6.5px .1px #e0e0e0;
    @media (max-width: 350px) {
	    height: 60vh;
	}
	@media (min-width: 550px) {
		max-height: 350px;
		margin: 0;
		box-shadow: 0 0 6.5px .1px #ececec;
	}
	.img-post {
		position: relative;
		width: 100%;
		flex: auto;
		height: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	.img-container {
		width: 100%;
		height: 100%;
		background-color: beige;
		transition: .3s ease;
		.new-tab {
			position: absolute;
			left: 5%;
			bottom: 6%;
			border-radius: 50%;
			color: #ffffff;
			width: max-content;
			width: 2.2rem;
			height: 2.2rem;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: .5rem 1rem;
			border: 1.5px solid #ffffff;
			font-size: .9rem;
			opacity: 0;
		}
		&:hover, &:active {
			width: 108%;
			height: 108%;
			transition: .3s ease-out;
			.new-tab {
				opacity: 0.9;
			}
			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.2);
			}
		}
		img {
			object-fit: cover;
			object-position: center center;
		}
	}
	.category {
		margin-bottom: .7rem;
		@media (min-width: 550px) {
			margin-bottom: .5rem;
		}
	}
	a {
		text-decoration: none;
	}
	h1 {
		font-size: 1.2rem;
		line-height: 1.60rem;
		color: rgb(43, 43, 43);
		&:hover {
			color: #4ab7ff;
		}
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
		height: fit-content;
		padding: 0.8rem;
		article {
			height: max-content;
		}
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