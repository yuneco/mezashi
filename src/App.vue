<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow: hidden;
  touch-action: manipulation;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(63, 59, 52);
  background-color: rgb(240, 206, 93);
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<script>
export default {
  mounted () {
    document.addEventListener('touchstart', event => {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    }, true)
  }
}
</script>
