<template>
  <div class="error-code">
    <div v-if="error.statusCode === 404">
      <h1 class="sc">404</h1>
      <h1>Page not found</h1>
    </div>
    <div v-else>
      <h1>Terjadi Kesalahan!</h1>
    </div>
    <NuxtLink to="/">Kembali ke halaman utama</NuxtLink>
  </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'error'
}
</script>

<style lang="scss">
.error-code {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 90%;
  >div {
    text-align: center;
  }
  .sc {
    color: #ff2222;
    font-size: 4rem;
  }
}
</style>