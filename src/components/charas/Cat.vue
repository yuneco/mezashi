<template>
  <e-cont class="cat-root"
    disable-animationX
    :x="x - 165" :y="y - 310 + animProps.rootY" :w="330" :h="315" :r="r + animProps.rootR" :s="catRootSize"
    :ox="165" :oy="310"
    :dur="2000"
    @click="$emit('click')"
  >

    <!-- 前足奥 -->
    <e-cont ref="amBk" :x="amBkPos.x" :y="amBkPos.y" :w="amBkPos.w" :h="amBkPos.h" :ox="amBkPos.ox" :oy="amBkPos.oy" :r="amBkPos.r">
      <am-hati></am-hati>
    </e-cont>
    <!-- 後ろ足奥 -->
    <e-cont ref="lgBk" :x="lgBkPos.x" :y="lgBkPos.y" :w="lgBkPos.w" :h="lgBkPos.h" :ox="lgBkPos.ox" :oy="lgBkPos.oy" :r="lgBkPos.r">
      <lg-hati></lg-hati>
    </e-cont>

    <!-- 体 -->
    <e-cont :x="87" :y="116" :w="210" :h="122" :ox="100" :oy="70">
      <bd-hati></bd-hati>
    </e-cont>

    <!-- 前足手前 -->
    <e-cont ref="amFr" :x="amFrPos.x" :y="amFrPos.y" :w="amFrPos.w" :h="amFrPos.h" :ox="amFrPos.ox" :oy="amFrPos.oy" :r="amFrPos.r">
      <am-hati></am-hati>
    </e-cont>
    <!-- 後ろ足手前 -->
    <e-cont ref="lgFr" :x="lgFrPos.x" :y="lgFrPos.y" :w="lgFrPos.w" :h="lgFrPos.h" :ox="lgFrPos.ox" :oy="lgFrPos.oy" :r="lgFrPos.r">
      <lg-hati></lg-hati>
    </e-cont>

    <!-- 尻尾 -->
    <e-cont :x="246" :y="14" :w="83" :h="136" :ox="16" :oy="120">
      <ta-hati></ta-hati>
    </e-cont>

    <!-- 頭 -->
    <e-cont :x="0" :y="0" :w="161" :h="200" :ox="125" :oy="150">
      <hd-hati></hd-hati>
    </e-cont>

    <e-cont v-if="hasMezashi" :x="-50" :y="160" :w="132" :h="32" :ox="66" :oy="16" :r="30">
      <mezashi-svg></mezashi-svg>
    </e-cont>
  </e-cont>
</template>

<script>
import ECont from '@/components/core/ECont'
import HdHati from '@/assets/CatHdHati.svg'
import BdHati from '@/assets/CatBdHati.svg'
import AmHati from '@/assets/CatAmHati.svg'
import LgHati from '@/assets/CatLgHati.svg'
import TaHati from '@/assets/CatTaHati.svg'
import MezashiSvg from '@/assets/Mezashi.svg'

import Tween from '@/core/Tween'
// import Time from '@/core/Time'

export default {
  name: 'Cat',
  components: { ECont, HdHati, BdHati, AmHati, LgHati, TaHati, MezashiSvg },
  props: {
    x: { type: [Number, String], default: 0 },
    y: { type: [Number, String], default: 0 },
    r: { type: [Number, String], default: 0 },
    s: { type: [Number, String], default: 1 }
  },
  data () {
    return {
      pose: null,
      amFrPosDefault: {
        x: 79, y: 208, w: 77, h: 103, ox: 58, oy: 17, r: 0
      },
      lgFrPosDefault: {
        x: 202, y: 210, w: 75, h: 109, ox: 53, oy: 20, r: 0
      },
      amBkPosDefault: {
        x: 59, y: 208, w: 77, h: 103, ox: 58, oy: 17, r: 0
      },
      lgBkPosDefault: {
        x: 182, y: 210, w: 75, h: 109, ox: 53, oy: 20, r: 0
      },

      animProps: {
        amFrR: 0,
        amBkR: 0,
        lgFrR: 0,
        lgBkR: 0,
        rootSY: 1,
        rootY: 0,
        rootR: 0
      },

      hasMezashi: false,
      tween: null,
      jumpHeight: 100
    }
  },
  computed: {
    amFrPos () {
      const p = { ...this.amFrPosDefault }
      p.r = this.animProps.amFrR
      return p
    },
    amBkPos () {
      const p = { ...this.amBkPosDefault }
      p.r = this.animProps.amBkR
      return p
    },
    lgFrPos () {
      const p = { ...this.lgFrPosDefault }
      p.r = this.animProps.lgFrR
      return p
    },
    lgBkPos () {
      const p = { ...this.lgBkPosDefault }
      p.r = this.animProps.lgBkR
      return p
    },
    catRootSize () {
      return [this.s, this.s * this.animProps.rootSY]
    }
  },
  methods: {
    async startPoseAnim (pose) {
      if (this.pose === pose) { return }
      this.stopPoseAnim()
      this.pose = pose
      while (this.pose) {
        const tw = this.tween = new Tween(this.animProps)
        if (this.pose === 'walk') {
          await tw.to({ amFrR: 30, amBkR: -30, lgFrR: -30, lgBkR: 30, rootY: 5, rootSY: 0.95 }, 500, tw.Easing.Cubic.Out)
          await tw.to({ amFrR: 0, amBkR: 0, lgFrR: 0, lgBkR: 0, rootY: 0, rootSY: 1 }, 500, tw.Easing.Cubic.In)
          await tw.to({ amFrR: -30, amBkR: 30, lgFrR: 30, lgBkR: -30, rootY: 8, rootSY: 0.95 }, 500, tw.Easing.Cubic.Out)
          await tw.to({ amFrR: 0, amBkR: 0, lgFrR: 0, lgBkR: 0, rootY: 0, rootSY: 1 }, 500, tw.Easing.Cubic.In)
        } else if (this.pose === 'fly') {
          const flyHeight = this.jumpHeight * 0.5
          await tw.to({ amFrR: 30, amBkR: -30, lgFrR: -90, lgBkR: -90, rootY: -flyHeight }, 500, tw.Easing.Cubic.Out)
          await tw.to({ amFrR: 0, amBkR: 0, rootY: -flyHeight - 20 }, 500, tw.Easing.Cubic.In)
          await tw.to({ amFrR: -30, amBkR: 30, rootY: -flyHeight }, 500, tw.Easing.Cubic.Out)
          await tw.to({ amFrR: 0, amBkR: 0, rootY: -flyHeight + 20 }, 500, tw.Easing.Cubic.In)
        } else if (this.pose === 'jump') {
          await tw.to({ amFrR: 30, amBkR: 30, lgFrR: -60, lgBkR: -60, rootY: -this.jumpHeight, rootSY: 0.95 }, 1000, tw.Easing.Cubic.Out)
          await tw.to({ amFrR: 0, amBkR: 0, lgFrR: 0, lgBkR: 0, rootY: 0, rootSY: 0.95 }, 1000, tw.Easing.Cubic.In)
        } else if (this.pose === 'fall') {
          await tw.to({ amFrR: -30, amBkR: -30, lgFrR: 30, lgBkR: 30, rootR: 360 }, 1000, tw.Easing.Cubic.Out)
          await tw.to({ amFrR: 30, amBkR: 30, lgFrR: -60, lgBkR: -60, rootY: 500 }, 1000, tw.Easing.Cubic.In)
          this.pose = null
          this.$emit('exit')
        } else {
          this.pose = null
        }
      }
    },
    stopPoseAnim () {
      this.pose = null
      if (this.tween) {
        this.tween.isSkip = true
      }
    },
    hitMezashi () {
      this.hasMezashi = true
      this.startPoseAnim('fall')
    },
    /* called by CollisionDetector */
    collide (targetComp, name) {
      this.$emit(`hit${name}`, targetComp)
    }
  },
  mounted () {
    this.jumpHeight = 50 + 300 * Math.random()
    const rnd = Math.random()
    if (rnd < 0.3) {
      this.startPoseAnim('walk')
    } else if (rnd < 0.6) {
      this.startPoseAnim('fly')
    } else {
      this.startPoseAnim('jump')
    }
  },
  beforeDestroy () {
    this.stopPoseAnim()
  }
}
</script>
