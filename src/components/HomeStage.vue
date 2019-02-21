<template>
  <div class="stage-root">

    <div class="content">
      <div class="title">
        ネコ メザシ アタック
        <div class="subtitle">
          NEKO MEZASHI ATTACK
        </div>
      </div>
      <div class="instruction">
        <div class="howto">
          ネコ メザシ アタックは迫り来るネコたちにカツオ砲から発射した
          メザシを与えて幸せにするゲームです。
          次から次へとやってくるネコたちにメザシをあたえきれずに
          タックルされるとゲームオーバーです。
        </div>
        <div class="contact">
          ご意見・ご感想・バグ報告は <a href="https://twitter.com/yuneco" target="_blank">@yuneco</a>まで
        </div>
      </div>
      <button class="start-game-btn" @click="startGame">START</button>
    </div>

    <player class="player" ref="player"
      :x="-80"
      :y="playerPos.y"
      :s="0.6"
      :r="30"
    ></player>
    <cat class="cat" ref="cat"
      :x="230"
      :y="playerPos.y"
      :s="0.6"
      :r="40"
      initial-pose="none"
    ></cat>
    <mezashi
      :x="170"
      :y="playerPos.y - 200"
      :s="0.6"
      :r="-20"
    ></mezashi>
  </div>
</template>

<style lang="scss" scoped>
.stage-root {
  position: relative;
  height: 100%;
}
.content {
  position: absolute;
  width: calc(100% - 10px);
  height: calc(100% - 60px);
  top: 30px;
  left: 5px;
  z-index: 1;
}
.title {
  font-size: 16pt;
  font-weight: bold;
  text-align: center;
  .subtitle {
    font-size: 8pt;
    letter-spacing: 0.4em;
  }
}
.start-game-btn {
  background-color: rgb(240, 206, 93);
  color: rgb(63, 59, 52);
  display: inline-block;
  width: 50%;
  left: 25%;
  padding: 10px;
  box-sizing: border-box;
  border: 4px solid rgb(97, 89, 74);
  font-size: 14pt;
  font-weight: bold;
  outline: none;
  border-radius: 10px;
}
.instruction {
  position: relative;
  height: calc(100% - 120px);
  text-shadow:
    #fff 2px 0px 0px, #fff -2px 0px 0px,
    #fff 0px -2px 0px, #fff 0px 2px 0px,
    #fff 2px 2px 0px, #fff -2px 2px 0px,
    #fff 2px -2px 0px, #fff -2px -2px 0px,
    #fff 1px 2px 0px, #fff -1px 2px 0px,
    #fff 1px -2px 0px, #fff -1px -2px 0px,
    #fff 2px 1px 0px, #fff -2px 1px 0px,
    #fff 2px -1px 0px, #fff -2px -1px 0px,
    #fff 1px 1px 0px, #fff -1px 1px 0px,
    #fff 1px -1px 0px, #fff -1px -1px 0px;

  .howto {
    padding: 25px;
    font-size: 9.5pt;
  }
  .contact {
    padding: 25px;
    font-size: 9.5pt;
    a {
      font-weight: bold;
      color: rgb(38, 110, 126);
      text-decoration: none;
    }
  }
}
.player {
  z-index: 0;
}
</style>

<script>
import Player from '@/components/charas/Player'
import Cat from '@/components/charas/Cat'
import Mezashi from '@/components/charas/Mezashi'
export default {
  name: 'HomeStage',
  components: { Player, Cat, Mezashi },
  data () {
    return {
      playerPos: {
        y: document.body.offsetHeight - 50
      }
    }
  },
  methods: {
    startGame () {
      this.$emit('newgame')
    },
    async startAnime () {
      const player = this.$refs.player
      while (this.$el) {
        await player.jump()
      }
    }
  },
  mounted () {
    // this.startAnime()
  }
}
</script>
