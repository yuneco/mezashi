<template>
  <div>
    <game-stage
      :width="stageWidth"
      :height="stageHeight"
      @gameover="gameover"
    ></game-stage>
  </div>
</template>

<script>
import GameStage from '@/components/GameStage'
export default {
  name: 'GameView',
  components: { GameStage },
  data () {
    return {
      stageWidth: 300,
      stageHeight: 400
    }
  },
  methods: {
    gameover () {
      this.$router.push('/')
    }
  },
  mounted () {
    const maxWidth = 400
    this.stageWidth = Math.min(maxWidth, document.body.offsetWidth)
    this.stageHeight = document.body.offsetHeight
  }
}
</script>
