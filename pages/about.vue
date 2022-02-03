<template>
  <div class="about-us">
    <h1>About <span>Us</span></h1>
    <div>
      <div class="wibro-info">
        <h2>Wibro</h2>
        <p>
          Wibro adalah sebuah blog website yang berfokus membahas Anime dan Jejepangan. Berasal dari kegemaran kami menonton Anime, kami akhirnya mendirikan situs ini dengan harapan dapat berbagi apa yang kami sukai kepada orang lain.
        </p>
      </div>
      <div class="website-info">
        <h2>Website</h2>
        <p>
          Develope by <a target="_blank" href="https://www.linkedin.com/in/angga-asriyanto-web-dev">Angga Asriyanto</a>, Desember 2021 menggunakan Nuxt.js dan Firebase.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'cwn',
  head() {
    return {
      title: 'About | Wibro'
    }
  }
}
</script>

<style lang="scss">
.about-us {
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-weight: 400;
  }
  h2 {
    margin-bottom: .5rem;
  }
  span {
    font-weight: 700;
    text-decoration: underline #4CF4FF;
  }
  p {
      line-height: 1.7rem;
      font-size: .85rem;
  }
  a {
    color: inherit
  }
  >div {
    margin-top: 1rem;
    @media (min-width: 550px) {
      max-width: 40%;
    }
    >div {
      margin: 0.5rem;
    }
    .wibro-info {
      padding: 1rem;
      background-color: rgb(11, 50, 73);
      border-radius: 5px;
      color: rgb(235, 235, 235);
    }
    .website-info {
      padding: 1rem;
      background-color: rgb(11, 126, 126);
      border-radius: 5px;
      color: rgb(235, 235, 235);
    }
  }
}
</style>