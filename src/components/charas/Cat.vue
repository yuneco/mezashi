<template>
  <e-cont class="cat-root"
    disable-animation
    :x="x" :y="y" :w="330" :h="315" :r="r" :s="s"
    @click="$emit('click')"
  >

    <!-- 前足奥 -->
    <e-cont :x="59" :y="208" :w="77" :h="103" :ox="58" :oy="17">
      <am-hati></am-hati>
    </e-cont>
    <!-- 後ろ足奥 -->
    <e-cont :x="182" :y="210" :w="75" :h="109" :ox="53" :oy="20">
      <lg-hati></lg-hati>
    </e-cont>

    <!-- 体 -->
    <e-cont :x="87" :y="116" :w="210" :h="122" :ox="100" :oy="70">
      <bd-hati></bd-hati>
    </e-cont>

    <!-- 前足手前 -->
    <e-cont :x="79" :y="208" :w="77" :h="103" :ox="58" :oy="17">
      <am-hati></am-hati>
    </e-cont>
    <!-- 後ろ足手前 -->
    <e-cont :x="202" :y="210" :w="75" :h="109" :ox="53" :oy="20">
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

  </e-cont>
</template>

<script>
import ECont from '@/components/core/ECont'
import HdHati from '@/assets/CatHdHati.svg'
import BdHati from '@/assets/CatBdHati.svg'
import AmHati from '@/assets/CatAmHati.svg'
import LgHati from '@/assets/CatLgHati.svg'
import TaHati from '@/assets/CatTaHati.svg'

export default {
  name: 'Cat',
  components: { ECont, HdHati, BdHati, AmHati, LgHati, TaHati },
  props: {
    x: { type: [Number, String], default: 0 },
    y: { type: [Number, String], default: 0 },
    r: { type: [Number, String], default: 0 },
    s: { type: [Number, String], default: 1 }
  }
}
</script>
