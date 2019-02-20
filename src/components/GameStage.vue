<template>
  <div>
    <cat v-for="cat in cats" :key="`cat-${cat.id}`"
      :x="cat.pos.x" :y="cat.pos.y" :s="cat.pos.s"
      @click="catClicked(cat)"
    ></cat>

    <player :x="player.pos.x" :y="player.pos.y" :s="player.pos.s"></player>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import Cat from '@/components/charas/Cat'
import Player from '@/components/charas/Player'
import Tween from '@/core/Tween'

export default {
  name: 'GameStage',
  components: { Cat, Player },
  data () {
    return {
      cats: [
        { id: 0, pos: { x: 300, y: 400, s: 0.3 } }
      ],
      player: {
        pos: { x: 100, y: 400, s: 0.3 }
      }
    }
  },
  methods: {
    async catClicked (cat) {
      console.log('click')
      const tw = new Tween(cat.pos)
      await tw.to({ x: cat.pos.x + 40 }, 500)
    }
  }
}
</script>
