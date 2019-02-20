<template>
  <div class="stage-root">
    <cat v-for="cat in cats" ref="cat" :key="`cat-${cat.id}`"
      :x="cat.pos.x" :y="cat.pos.y" :s="cat.pos.s"
      @click="catClicked(cat)"
    ></cat>

    <player ref="player"
      :x="player.pos.x" :y="player.pos.y" :s="player.pos.s"
      @hitCat="onHitCat"
    ></player>

  </div>
</template>

<style lang="scss" scoped>
.stage-root {
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  height: 568px;
  border: 1px solid gray;
  box-sizing: border-box;
}

</style>

<script>
import Cat from '@/components/charas/Cat'
import Player from '@/components/charas/Player'
import Tween from '@/core/Tween'
import CollisionDetector from '@/core/CollisionDetector'

export default {
  name: 'GameStage',
  components: { Cat, Player },
  props: {
    width: { type: Number, default: 320 },
    height: { type: Number, default: 568 }
  },
  data () {
    return {
      collisionTimer: 0,
      collisionDetector: new CollisionDetector(),
      cats: [
        { id: 0, pos: { x: 200, y: this.height - 20, s: 0.2 } }
      ],
      player: {
        pos: { x: 40, y: this.height - 20, s: 0.2 }
      }
    }
  },
  methods: {
    async catClicked (cat) {
      const tw = new Tween(cat.pos)
      await tw.to({ x: -100 }, 5000)
      cat.pos.x = 300
    },
    checkCollision () {
      this.collisionDetector.clear()
      this.collisionDetector.add(this.$refs.player, ...this.$refs.cat)
      this.collisionDetector.detect()
    },
    onHitCat (catComp) {
      console.log('HIT CAT', catComp)
    }
  },
  mounted () {
    this.collisionTimer = window.setInterval(this.checkCollision, 500)
  },
  beforeDestroy () {
    window.clearInterval(this.collisionTimer)
  }
}
</script>
