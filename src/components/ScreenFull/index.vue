<template>
  <div>
    <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px; margin-right:10px" @click="onclick" />
  </div>
</template>

<script>

import screenfull from 'screenfull'
export default {
  data() {
    return {

    }
  },

  created() {

  },

  methods: {
    onclick() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style scoped>

</style>
