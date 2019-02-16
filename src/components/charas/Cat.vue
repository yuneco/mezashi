<template>
  <e-cont
    class="cat-root"
    disable-animation
    :x="pos.x || 0"
    :y="pos.y || 0"
    :w="80"
    :h="40"
    @click="$emit('click')"
    >
    <div>
      =^・・^=
    </div>
  </e-cont>
</template>

<style lang="scss" scoped>
  .cat-root {
    background-color: rgb(215, 180, 138);
    border: 1px solid rgb(90, 63, 63);
  }
</style>

<script>
import ECont from '@/components/core/ECont'

export default {
  name: 'Cat',
  components: { ECont },
  props: {
    pos: { type: Object, default () { return {} } }
  },
  methods: {
  }
}
</script>
