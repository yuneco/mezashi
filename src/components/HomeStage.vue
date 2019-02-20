<template>
  <div class="stage-root">
    <button class="start-game"
      @click="startGame"
    >START GAME</button>
  </div>
</template>

<script>
export default {
  methods: {
    startGame () {
      this.$emit('newgame')
    }
  }
}
</script>
