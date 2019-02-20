<template>
  <e-cont class="player-root"
    disable-animation
    :x="x - 182" :y="~~y + dpos.y - 570" :w="365" :h="579" :r="r"
    :s="[s * dpos.sx, s * dpos.sy]"
    :ox="182" :oy="570"
    @click="clicked"
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
import Tween from '@/core/Tween'

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
      dpos: { y: 0, sx: 1, sy: 1 }
    }
  },
  computed: {
  },
  methods: {
    async clicked () {
      this.$emit('click')
      await this.jump()
    },
    async jump (height = 200, dur = 3000) {
      const tw = new Tween(this.dpos)
      await tw.to({ y: 0, sy: 0.9 }, dur * 0.1)
      await tw.to({ y: -height, sy: 1.1 }, dur * 0.5, tw.Easing.Cubic.Out)
      await tw.to({ y: 0, sy: 1 }, dur * 0.4, tw.Easing.Cubic.In)
      await tw.to({ y: 0, sy: 0.9 }, dur * 0.05)
      await tw.to({ y: 0, sy: 1 }, dur * 0.05)
    },
    /* called by CollisionDetector */
    collide (targetComp, name) {
      this.$emit(`hit${name}`, targetComp)
    }
  }

}
</script>
