<template>
	<header>
		<nav>
			<div class="nav-menu">
				<div class="menu-bar">
					<button @click="toggleBar" aria-label="toggle" type="button" class="toggle-bar">
						<span><i class="fas fa-bars"></i></span>
					</button>
				</div>
				<div class="brand">
					<nuxt-link to="/">
						<img src="../static/wibro.svg" alt="wibro logo">
					</nuxt-link>
				</div>
				<div class="user-cont">
					<div @click="showUser" class="user">
						<img loading="lazy" v-if="$store.state.profilePhoto" :src="$store.state.profilePhoto" :alt="$store.state.profilePhotoName">
						<img v-else src="../static/user.svg" alt="user">
					</div>
					<div v-if="$store.state.isInfoUser" class="info-user">
						<div v-if="!$store.state.profileUsername" class="option">
							<div>
								<nuxt-link @click.native="showUser" :to="{ name: 'users-login' }">Login</nuxt-link>
							</div>
							<hr>
							<div>
								<nuxt-link @click.native="showUser" :to="{ name: 'users-register' }">Daftar</nuxt-link>
							</div>
						</div>
						<div v-if="$store.state.profileUsername" class="option">
							<div v-if="username">
								<p>{{ username }}</p>
							</div>
							<hr v-if="username">
							<div>
								<nuxt-link @click.native="showUser" :to="{ name: 'users-edit-profile' }">Edit Profile</nuxt-link>
							</div>
							<hr>
							<div v-if="$store.state.isAdmin">
								<nuxt-link @click.native="showUser" :to="{ name: 'create-post' }">Create Post</nuxt-link>
							</div>
							<hr v-if="$store.state.isAdmin">
							<div>
								<button @click="logOut" class="logout">Logout</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>

		<div :class="{ 'bar': true, 'show': $store.state.isBar }">
			<div class="bar-menu">
				<div class="brand-cont">
					<div class="img-cont">
						<img src="../static/wibro.svg" alt="wibro">
					</div>
					<button @click="toggleBar" class="toggle-bar">
						<span><i class="fas fa-times"></i></span>
					</button>
				</div>
				<div>
					<details>
						<summary @click="listCategory">Category <span v-if="!clickList">+</span><span v-else>-</span></summary>
						<ul>
							<li>
								<nuxt-link v-if="hasCategory('news')" @click.native="toggleBar" class="news" :to="{ name: 'posts-category-name-idx', params: { name: 'news', idx: '1'}}">News</nuxt-link>
							</li>
							<li>
								<nuxt-link v-if="hasCategory('chart')" @click.native="toggleBar" class="chart" :to="{ name: 'posts-category-name-idx', params: { name: 'chart', idx: '1'}}">Chart</nuxt-link>
							</li>
							<li>
								<nuxt-link v-if="hasCategory('review')" @click.native="toggleBar" class="review" :to="{ name: 'posts-category-name-idx', params: { name: 'review', idx: '1'}}">Review</nuxt-link>
							</li>
							<li>
								<nuxt-link v-if="hasCategory('curious')" @click.native="toggleBar" class="curious" :to="{ name: 'posts-category-name-idx', params: { name: 'curious', idx: '1'}}">Curious</nuxt-link>
							</li>
							<li>
								<nuxt-link v-if="hasCategory('opinion')" @click.native="toggleBar" class="opinion" :to="{ name: 'posts-category-name-idx', params: { name: 'opinion', idx: '1'}}">Opinion</nuxt-link>
							</li>
							<li>
								<nuxt-link v-if="hasCategory('hot18')" @click.native="toggleBar" class="hot18" :to="{ name: 'posts-category-name-idx', params: { name: 'hot18', idx: '1'}}">Hot18</nuxt-link>
							</li>
						</ul>
					</details>
				</div>
				<div>
					<nuxt-link @click.native="toggleBar" :to="{ name: 'about' }">About</nuxt-link>
				</div>
				<div>
					<nuxt-link @click.native="toggleBar" :to="{ name: 'contact' }">Contact</nuxt-link>
				</div>
				<div v-if="$store.state.profileUsername">
					<nuxt-link @click.native="toggleBar" :to="{ name: 'admin' }">Admin</nuxt-link>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
    data() {
        return {
            bar: null,
            infoUser: null,
			clickList: null,
        }
    },
	computed: {
		username() {
			return this.$store.state.profileUsername
		},
	},
    methods: {
        toggleBar() {
			this.$store.commit("toggleBar")
        },

		hasCategory(category) {
			const posts = this.$store.state.posts.some((post) => post.postCategory === category)
			return posts;
		},

		listCategory() {
			this.clickList = !this.clickList
		},

        showUser() {
            this.$store.commit("toggleInfoUser")
        },

		async logOut() {
			await this.$fire.auth.signOut()
			await this.$store.dispatch('isAnonymous')
			window.location.reload()
			this.$store.commit("toggleInfoUser")
		}
    }
}
</script>

<style lang="scss">
nav {
	position: relative;
	width: 100%;
	height: 8vh;
	font-size: 0.85rem;
	background-color: #fff;
	z-index: 1000;
	padding: 0 0.5rem;
	@media (min-width: 550px) {
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
	}
	a {
		font-size: inherit;
		text-decoration: none;
		color: rgb(20, 20, 20);
	}
	.nav-menu {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
        @media (min-width: 550px) {
            padding: 0 5rem;
        }
	}
	.brand {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 8vh;
		display: flex;
		align-items: center;
		a {
			width: max-content;
			height: 60%;
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	.user-cont {
		position: relative;
		width: 22px;
		height: 22px;
	}
	.user {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background-color: #c5c5c5;
		cursor: pointer;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	.info-user {
		position: absolute;
		top: 7vh;
		right: 0;
		min-width: 100px;
		width: max-content;
		height: max-content;
		padding: 0.2rem 0.5rem;
		text-align: center;
		border-radius: 10px;
		background-color: #fff;
		border: 1px solid #dfdfdf
	}
	.option {
		>div {
			width: 7rem;
			height: 2.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.logout {
			font-family: inherit;
			background-color: transparent;
			border: none;
			font-size: inherit;
			color: red;
			cursor: pointer;
			&:active {
				opacity: 0;
			}
		}
	}
	hr {
		border: none;
		background-color: rgb(230, 230, 230);
		height: 1px;
	}
}

.bar {
	position: fixed;
	top: 0;
	left: 0;
	width: 60%;
	max-width: 300px;
	height: 100%;
	transition: .8s ease;
	transform: translateX(-105%);
	background-color: #fff;
	z-index: 5000;
	box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
	a {
		text-decoration: none;
		color: rgb(43, 43, 43);
		font-weight: 700;
		&:active {
			opacity: 0;
		}
	}
	.bar-menu {
		>div {
			width: 100%;
			padding: 1.5rem 1rem 1rem;
		}
		.brand-cont {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem 1rem;
			border-bottom: 1px solid #dfdfdf;
			.img-cont {
				width: 30px;
				img {
					height: 100%;
					width: 100%;
					object-fit: cover;
				}
			}
		}
		details {
			>summary {
				color: inherit;
				font-weight: 700;
				list-style: none;
				cursor: pointer;
				span {
					margin-left: .5rem;
					color: #686868;
				}
			}
			ul {
				margin-top: .5rem;
				li {
					margin: .8rem 0;
					list-style: none;
					a {
						font-weight: 500;
						font-size: .8rem;
						&.news {
							&:hover {
								color: rgb(15, 138, 253);
								text-decoration: underline;
							}
						}
						&.chart {
							&:hover {
								color: #ffbc04;
								text-decoration: underline;
							}
						}
						&.review {
							&:hover {
								color: #13ccad;
								text-decoration: underline;
							}
						}
						&.curious {
							&:hover {
								color: #d43391;
								text-decoration: underline;
							}
						}
						&.opinion {
							&:hover {
								color: #9927e6;
								text-decoration: underline;
							}
						}
						&.hot18 {
							&:hover {
								color: #fc01da;
								text-decoration: underline;
							}
						}
					}
				}
			}
		}
	}
}

.bar.show {
	transition: 1s ease;
	transform: translateX(0);
}

.toggle-bar {
	cursor: pointer;
	background-color: transparent;
	border: none;
	&:active {
		opacity: 0;
	}
}

</style>