<template>
  <div class="stage-root" :style="{
    width: `${width}px`,
    height: `${height}px`
  }">
    <div class="score-wrapper">
      <div class="score-box">
        {{ scoreStr }}
      </div>
      <div class="score-info">
        の ねこに めざしを あたえました
      </div>
    </div>
    <div class="cont">
      <button @click.stop="jumpPlayer">Jump</button>
      <button @click.stop="fireMezashi">Mezashi</button>
      <div class="bulletCount">{{ bulletLeftStr }}</div>
    </div>

    <cat v-for="cat in cats" ref="cat" :key="`cat-${cat.id}`"
      :x="cat.pos.x" :y="cat.pos.y" :s="cat.pos.s"
      @hitMezashi="(mezashiComp) => onCatHitMezashi(cat, mezashiComp)"
      @exit="removeCat(cat)"
    ></cat>

    <mezashi v-for="mezashi in mezashis" ref="mezashi" :key="`mezashi-${mezashi.id}`"
      :x="mezashi.pos.x" :y="mezashi.pos.y" :s="mezashi.pos.s"
      @hitCat="(catComp) => onMezashiHitCat(mezashi, catComp)"
    ></mezashi>

    <player ref="player"
      :x="playerPos.x" :y="playerPos.y" :s="playerPos.s"
      @hitCat="onPlayerHitCat"
    ></player>

  </div>
</template>

<style lang="scss" scoped>
.stage-root {
  position: absolute;
  top: 0;
  left: 0;
  width: 350px;
  height: 530px;
  border: 1px solid gray;
  background: white;
  box-sizing: border-box;
  overflow: hidden;
}
.cont {
  position: absolute;
  width: 100%;
  height: 80px;
  bottom: 0;
  .bulletCount {
    position: absolute;
    z-index: 1;
    width: 50%;
    height: 20px;
    bottom: 10px;
    right: 0;
    color: rgb(63, 59, 52);
    font-size: 11pt;
    text-align: center;
    pointer-events: none;
  }
}
.score-box {
  color: rgb(63, 59, 52);
  font-size: 16pt;
}
.score-info {
  color: rgb(63, 59, 52);
  font-size: 11pt;
}
button {
  background-color: rgb(240, 206, 93);
  color: rgb(63, 59, 52);
  display: inline-block;
  width: 50%;
  height: 80px;
  box-sizing: border-box;
  border: 2px solid rgb(63, 59, 52);
  font-size: 14pt;
  outline: none;
  &+button {
    margin-left: -2px;
    width: calc(50% + 2px);
  }
}
</style>

<script>
import Cat from '@/components/charas/Cat'
import Player from '@/components/charas/Player'
import Mezashi from '@/components/charas/Mezashi'
import Time from '@/core/Time'
import Tween from '@/core/Tween'
import CollisionDetector from '@/core/CollisionDetector'
import playSound from '@/assets/playSound'

export default {
  name: 'GameStage',
  components: { Cat, Player, Mezashi },
  props: {
    width: { type: Number, default: 350 },
    height: { type: Number, default: 530 }
  },
  data () {
    return {
      collisionTimer: 0,
      collisionDetector: new CollisionDetector(),
      gemeTickTimer: 0,
      level: 1,
      expToLevelup: 3,
      score: 0,
      maxBullet: 6,
      bulletLeft: 6,
      isGameover: false,
      cats: [
      ],
      mezashis: [
      ]
    }
  },
  computed: {
    scoreStr () {
      return `${this.score} 匹`
    },
    mainHeight () {
      return this.height - 80
    },
    playerPos () {
      return { x: 40, y: this.mainHeight - 10, s: 0.2 }
    },
    bulletLeftStr () {
      if (this.bulletLeft <= 0) { return 'reloading...' }
      return new Array(this.bulletLeft + 1).join('●') + new Array(this.maxBullet - this.bulletLeft + 1).join('○')
    }
  },
  methods: {
    checkCollision () {
      this.collisionDetector.clear()
      this.collisionDetector.add(
        this.$refs.player,
        ...(this.$refs.cat || []),
        ...(this.$refs.mezashi || [])
      )
      this.collisionDetector.detect()
    },
    async onPlayerHitCat (catComp) {
      if (this.isGameover) { return }
      playSound('gameover')
      this.isGameover = true
      await this.$refs.player.fall()
      this.$emit('gameover', this.score)
    },
    onCatHitMezashi (cat, mezashiComp) {
      cat.tw.isSkip = true
    },
    onMezashiHitCat (mezashi, catComp) {
      this.removeMezashi(mezashi)
      if (catComp.hasMezashi) { return }
      playSound('catch')
      catComp.hitMezashi()
      this.expToLevelup -= 1
      this.score++
      if (this.expToLevelup <= 0) {
        // level up ! //
        this.level++
        this.expToLevelup = this.level * 3
      }
    },
    async fireMezashi () {
      if (this.bulletLeft <= 0) {
        return
      }
      playSound('shot')
      const id = Math.floor(Math.random() * 100000)
      const mz = { id, pos: { x: 100, y: this.mainHeight - 20, s: 0.2 } }
      // Decide Y pos of mezashi
      const player = this.$refs.player
      const ppos = player.$el.getBoundingClientRect()
      mz.pos.y = ppos.y + (ppos.height * 0.55)
      this.$data.mezashis.push(mz)
      this.bulletLeft -= 1
      if (this.bulletLeft <= 0) {
        this.reloadBullet()
      }
      // animation
      mz.tw = new Tween(mz.pos)
      await mz.tw.to({ x: this.width }, 2000)
      this.removeMezashi(mz)
    },
    async reloadBullet () {
      const LOADTIME_MS = 1500
      await Time.wait(LOADTIME_MS)
      this.bulletLeft = this.maxBullet
    },
    async addCat () {
      const id = Math.floor(Math.random() * 100000)
      const cat = { id, pos: { x: this.width, y: this.mainHeight - 20, s: 0.2 } }
      this.$data.cats.push(cat)
      cat.tw = new Tween(cat.pos)
      const isFin = await cat.tw.to({ x: -100 }, 10000)
      console.log('FIN CAT at', isFin)
      if (isFin) { this.removeCat(cat) }
    },
    removeMezashi (mezashiData) {
      const index = this.$data.mezashis.indexOf(mezashiData)
      if (index === -1) { return }
      this.$data.mezashis.splice(index, 1)
    },
    removeCat (catData) {
      console.warn('REMOVE CAT')
      const index = this.$data.cats.indexOf(catData)
      if (index === -1) { return }
      this.$data.cats.splice(index, 1)
    },
    jumpPlayer () {
      playSound('jump')
      const player = this.$refs.player
      player.jump()
    },
    tickGame () {
      // Add a cat if not enough cats on the stage
      const catCount = this.cats.length
      if (catCount < this.level) {
        if (Math.random() > 0.5) {
          this.addCat()
        }
      }
    }
  },
  mounted () {
    this.collisionTimer = window.setInterval(this.checkCollision, 100)
    this.gemeTickTimer = window.setInterval(this.tickGame, 1000)
  },
  beforeDestroy () {
    window.clearInterval(this.collisionTimer)
  }
}
</script>
