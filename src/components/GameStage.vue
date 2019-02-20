<template>
  <div class="stage-root">
    <div class="cont">
      <button @click="jumpPlayer">Jump</button>
      <button @click="fireMezashi">Mezashi</button>
    </div>

    <cat v-for="cat in cats" ref="cat" :key="`cat-${cat.id}`"
      :x="cat.pos.x" :y="cat.pos.y" :s="cat.pos.s"
      @click="catClicked(cat)"
    ></cat>

    <mezashi v-for="mezashi in mezashis" ref="mezashi" :key="`mezashi-${mezashi.id}`"
      :x="mezashi.pos.x" :y="mezashi.pos.y" :s="mezashi.pos.s"
      @hitCat="onMezashiHitCat"
    ></mezashi>

    <player ref="player"
      :x="player.pos.x" :y="player.pos.y" :s="player.pos.s"
      @hitCat="onPlayerHitCat"
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
import Mezashi from '@/components/charas/Mezashi'
import Tween from '@/core/Tween'
import CollisionDetector from '@/core/CollisionDetector'

export default {
  name: 'GameStage',
  components: { Cat, Player, Mezashi },
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
      mezashis: [
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
    onPlayerHitCat (catComp) {
      console.log('PLAYER HIT CAT', catComp)
    },
    onMezashiHitCat (catComp) {
      console.log('MEZASHI HIT CAT', catComp)
    },
    async fireMezashi () {
      const id = Math.floor(Math.random() * 100000)
      const mz = { id, pos: { x: 100, y: this.height - 20, s: 0.2 } }
      // Decide Y pos of mezashi
      const player = this.$refs.player
      const ppos = player.$el.getBoundingClientRect()
      mz.pos.y = ppos.y + (ppos.height * 0.55)
      this.$data.mezashis.push(mz)
      // animation
      mz.tw = new Tween(mz.pos)
      await mz.tw.to({ x: this.width + 100 }, 2000)
      this.removeMezashi(mz)
    },
    removeMezashi (mezashiData) {
      const index = this.$data.mezashis.indexOf(mezashiData)
      if (index === -1) { return }
      this.$data.mezashis.splice(index, 1)
    },
    jumpPlayer () {
      const player = this.$refs.player
      player.jump()
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
