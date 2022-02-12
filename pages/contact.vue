<template>
  <div class="contact">
    <div>
      <h1>Kontak <span>Kami</span></h1>
      <p>Punya beberapa pertanyaan kritik atau saran, Hubungi kami via berikut</p>
      <div class="contact-info">
        <div class="mail">
          <a href="mailto:wibroidn@gmail.com" aria-label="email"><span><i class="fas fa-envelope"></i></span></a>
          <p>wibroidn@gmail.com</p>
        </div>  
        <div class="social-media">
          <a href="https://discord.gg/Uyr8Ms4auS" target="_blank" rel="noreferrer" aria-label="discord-msg"><span><i class="fab fa-discord"></i></span></a>
          <a href="https://www.instagram.com/bang_wibro/" target="_blank" rel="noreferrer" aria-label="instagram-msg"><span><i class="fab fa-instagram"></i></span></a>
          <a href="https://twitter.com/bangwibro" target="_blank" rel="noreferrer" aria-label="twitter-msg"><span><i class="fab fa-twitter"></i></span></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'cwn',
  head() {
    return {
      title: 'Contact | Wibro',
      link: [
        { rel: "canonical", href: "https://wibro.site/contact"}
      ]
    }
  }
}
</script>

<style lang="scss">
.contact {
  width: 100%;
  height: 100%;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  >div {
    padding: 1rem 1.5rem;
    border-radius: 5px;
    border: 2px solid #e7e7e7;
    text-align: center;
    h1 {
      word-spacing: .2rem;
      font-size: 2.2rem;
      font-weight: 400;
    }
    span {
      font-weight: 700;
    }
    p {
      font-size: .9rem;
    }
    a {
      color: #000;
      &:hover {
        color: #4989ff
      }
    }
    .contact-info {
      width: 100%;
      >div {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
      }
      .mail {
        width: max-content;
        margin: 1rem auto;
        padding: .5rem 1rem;
        border: 2px solid #e7e7e7;
        p {
          margin-left: 1rem;
        }
      }
      .social-media {
        a {
          margin: 0 .8rem;
        }
      }
    }
  }
}

</style>