<template>
  <e-cont class="player-root"
    disable-animation
    :x="x" :y="~~y + dy" :w="365" :h="579" :r="r" :s="s"
    @click="$emit('click')"
  >

  <e-cont :x="6" :y="225" :w="276" :h="355" :ox="143" :oy="353">
    <bd></bd>
  </e-cont>

  <e-cont :x="54" :y="241" :w="311" :h="202" :ox="67" :oy="21">
    <am></am>
  </e-cont>

  <e-cont :x="0" :y="0" :w="253" :h="288" :ox="166" :oy="236">
    <hd></hd>
  </e-cont>

  </e-cont>
</template>

<script>
import ECont from '@/components/core/ECont'
import Hd from '@/assets/PrHd.svg'
import Bd from '@/assets/PrBd.svg'
import Am from '@/assets/PrAm.svg'

export default {
  name: 'Player',
  components: { ECont, Hd, Bd, Am },
  props: {
    x: { type: [Number, String], default: 0 },
    y: { type: [Number, String], default: 0 },
    r: { type: [Number, String], default: 0 },
    s: { type: [Number, String], default: 1 }
  },
  data () {
    return {
      dy: 0
    }
  },
  methods: {
    async jump (height = 200, dur = 3000) {

    }
  }

}
</script>
