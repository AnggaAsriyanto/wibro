<template>
  <div class="sidebar">
    <div class="ads-sidebar">
      <!-- <Adsense
        v-if="desktop"
        style="display:inline-block;width:250px;height:250px"
        data-ad-client="ca-pub-1142153237520676"
        data-ad-slot="7053010856">
      </Adsense> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      desktop: null
    }
  },
  mounted() {
    // hide sidebar on mobile frame
    if(window.innerWidth >= 1000) {
      this.desktop = true
      return
    }

    this.desktop = false
  }
}
</script>