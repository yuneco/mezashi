<template>
  <div>
    <cat v-for="cat in cats" :key="`cat-${cat.id}`"
      :pos="cat.pos"
      @click="catClicked(cat)"
    ></cat>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import Cat from '@/components/charas/Cat'
export default {
  name: 'GameStage',
  components: { Cat },
  data () {
    return {
      cats: [
        { id: 0, pos: { x: 300, y: 400 } }
      ]
    }
  },
  methods: {
    catClicked (cat) {
        cat.pos.x += 30
    }
  }
}
</script>
