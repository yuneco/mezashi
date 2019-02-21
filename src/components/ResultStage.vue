<template>
  <div class="stage-root">

    <div class="content">
      <div class="title">
        GAME OVER
      </div>
      <div class="score">
        <div class="pre">あなたは</div>
        <div class="main">
          {{ resultSocre }}<span class="after">ひきの</span>
        </div>
        <div class="after">猫にメザシをあたえました！</div>
      </div>

      <button class="btn home-btn" @click="goHome">HOME</button>
      <button class="btn game-btn" @click="startGame">RETRY</button>
      <button class="btn tweet-btn" @click="tweet">
        結果をツイートする
        <span class="info">
          Twitterの画面が開きます
        </span>
      </button>
    </div>

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
}
.score {
  padding: 30px 10px;
  text-align: center;
  .main {
    font-size: 40pt;
    font-weight: bold;
  }
  .pre, .after {
    font-size: 10pt;
    letter-spacing: 0.2em;
  }
}
.btn {
  background-color: rgb(240, 206, 93);
  color: rgb(63, 59, 52);
  display: inline-block;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid rgb(97, 89, 74);
  font-size: 14pt;
  outline: none;
  border-radius: 10px;
}
.game-btn, .home-btn {
  width: 40%;
  margin: 10px;
}
.tweet-btn {
  width: calc(80% + 20px);
  margin: 10px;
  .info {
    display: block;
    font-size: 9pt;
    letter-spacing: 0.2em;
    text-align: center;
  }
}

</style>

<script>
import playSound from '@/assets/playSound'
export default {
  name: 'ResultStage',
  computed: {
    resultSocre () {
      return this.$store.state.result.score
    }
  },
  methods: {
    startGame () {
      playSound('btn')
      this.$emit('newgame')
    },
    goHome () {
      playSound('btn')
      this.$emit('gohome')
    },
    tweet () {
      playSound('btn')
      const text = encodeURIComponent(`ネコメザシアタックで${this.resultSocre}匹の猫にメザシをあげたよ！`)
      const pageUrl = `${document.location.protocol}//${document.location.host}/`
      const pop = window.open('', 'nekotweet')
      pop.document.body.innerHTML = 'loading...'
      const twurl = `https://twitter.com/share?text=${text}&url=${pageUrl}&hashtags=MezashiAttack`
      window.open(twurl, 'nekotweet')
    }
  },
  mounted () {
  }
}
</script>
