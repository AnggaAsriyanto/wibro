<template>
    <footer ref="footer">
        <div class="brand">
            <figure class="img-cont">
				<img src="../static/wibro-full.svg" alt="wibro">
			</figure>
            <p>Situs Blog Berita dan Info Anime terupdate di Indonesia, Wibro © Copyright 2022</p>
        </div>

        <div class="link">
            <div class="quick-link">
				<ul>
					<li><nuxt-link to="/">Home</nuxt-link></li>
					<li><nuxt-link :to="{ name: 'about' }">About</nuxt-link></li>
					<li><nuxt-link :to="{ name: 'contact' }">Contact</nuxt-link></li>
					<li v-if="$store.state.profileUsername"><nuxt-link :to="{ name: 'admin' }">Admin</nuxt-link></li>
				</ul>
            </div>
        
            <div class="social-media">
                <small>Follow Us</small>
                <div class="social-link">
                    <a href="https://discord.gg/Uyr8Ms4auS" target="_blank" rel="noreferrer" aria-label="discord"><i class="fab fa-discord"></i></a>
                    <a href="https://www.instagram.com/bang_wibro/" target="_blank" rel="noreferrer"  aria-label="instagram"><i class="fab fa-instagram"></i></a>
                    <a href="https://twitter.com/bangwibro" target="_blank" rel="noreferrer" aria-label="twitter"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
footer {
	position: relative;
	background-color: rgb(43, 59, 85);
	height: max-content;
	width: 100vw;
	padding: 1.5rem 1rem;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: left;
	z-index: 100;
	flex-direction: column;
	.brand {
		padding: 1rem;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.2);
		p {
			margin-top: 0.2rem;
			font-size: 0.75rem;
			letter-spacing: 0.5px;
			line-height: 1.3rem;
			width: 90%;
			color: rgba(255, 255, 255, 0.9);
		}
		.img-cont {
			height: 4rem;
			width: 7rem;
			margin-bottom: 1rem;
			display: flex;
			align-items: flex-end;
			img {
				height: 100%;
				width: 100%;
				object-fit: contain;
			}
			h1 {
				margin-bottom: -0.8rem;
			}
		}
	}
	.link {
		width: 100%;
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.2);
	}
	.quick-link {
		flex: auto;
		max-width: 130px;
	}
	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		background-color: rgb(95, 95, 250);
		li {
			line-height: 1.8rem;
			background-color: rgba(0, 0, 0, 0.1);
			&:nth-of-type(even) {
				background-color: rgba(0, 0, 0, 0.3);
			}
		}
		a {
			width: 100%;
			display: inline-block;
			padding: 5px 10px;
			font-size: 0.8rem;
			font-weight: 400;
			letter-spacing: 0.2px;
			white-space: nowrap;
			border-radius: 10px;
			text-decoration: none;
			color: #fff;
			&:active {
				opacity: 0;
			}
		}
	}
	.social-media {
		display: flex;
		align-items: center;
		flex-direction: column;
		a {
			font-size: 1.5rem;
			text-decoration: none;
			margin: 0 0.3rem;
			width: 3rem;
			height: 3rem;
			display: grid;
			place-items: center;
			border-radius: 50%;
			color: rgb(17, 15, 15);
			background-color: #fff;
		}
	}
}
.social-media {
	.social-link {
		margin-top: 1rem;
		display: flex;
		padding: 0 1rem;
	}
}
@media (max-width: 350px) {
	footer {
		.link {
			flex-direction: column-reverse;
			padding: 1rem;
		}
		.quick-link {
			width: 100%;
			max-width: none;
			margin-top: 1.5rem;
		}
	}
}
@media (min-width: 550px) {
	footer {
		flex-direction: row;
		.brand {
			flex: 3;
			margin-right: 2rem;
		}
		.link {
			flex: 1.7;
			margin: 0 2rem 0 0;
		}
	}
}

</style>