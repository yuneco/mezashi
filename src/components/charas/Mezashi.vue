<template>
  <e-cont class="mezashi-root"
    :x="x - 66" :y="~~y + dpos.y - 16" :w="132" :h="32" :r="r"
    :s="[s * dpos.sx, s * dpos.sy]"
    :ox="66" :oy="16"
  >
      <mezashi-svg></mezashi-svg>
    </e-cont>
</template>

<script>
import ECont from '@/components/core/ECont'
import MezashiSvg from '@/assets/Mezashi.svg'
export default {
  name: 'Mazashi',
  components: { ECont, MezashiSvg },
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
  methods: {
    /* called by CollisionDetector */
    collide (targetComp, name) {
      this.$emit(`hit${name}`, targetComp)
    }
  }
}
</script>
