<template>
  <div class="elem-container"
    :class="{
      debug: debug
    }"
    :style="{
      width: `${w}px`,
      height: `${h}px`,
      opacity: a,
      transformOrigin: `${ox}px ${oy}px`,
      transform: `translate3d(${x}px, ${y}px ,${z}px) scale(${s}) rotate(${r}deg)`,
      transition: disableAnimation ? 'none' : `
        transform ${dur}ms 0s ${easing},
        transform-origin ${dur}ms 0s ${easing},
        opacity ${dur}ms 0s ${easing}`,
    }"
    @click.stop="clicked"
    @transitionend.stop ="ontransitionend"
    >
    <slot></slot>

    <div class="debug-origin" v-if="debug" :style="{
      transform: `translate(${ox}px, ${oy}px`
    }"></div>
    <div class="debug-name" v-if="debug">{{ name }}</div>
  </div>
</template>

<style lang="scss" scoped>
  div.elem-container {
    position: absolute;
    left: 0;
    top: 0;
  }
  .debug {
    border: 1px dotted red;
    .debug-origin {
      position: absolute;
      width: 3px;
      height: 3px;
      left: 0;
      top: 0;
      background-color: red;
    }
    .debug-name {
      position: absolute;
      top: -10pt;
      left: 0;
      font-size: 8pt;
      color: red;
    }
  }
</style>

<script>
export default {
  props: {
    debug: { type: [Boolean, String], default: false },
    name: { type: String, default: '' },
    ox: { type: [Number, String], default: 0 },
    oy: { type: [Number, String], default: 0 },
    x: { type: [Number, String], default: 0 },
    y: { type: [Number, String], default: 0 },
    w: { type: [Number, String], default: 0 },
    h: { type: [Number, String], default: 0 },
    z: { type: [Number, String], default: 0 },
    r: { type: [Number, String], default: 0 },
    s: { type: [Number, String], default: 1 },
    a: { type: [Number, String], default: 1 },
    dur: { type: [Number, String], default: 0 },
    easing: { type: String, default: 'ease' },
    disableAnimation: { type: Boolean, default: false }
  },
  data () {
    return {
      transitionendResolves: []
    }
  },
  methods: {
    clicked (...args) {
      this.$emit('click', ...args)
    },
    async waitTransitionEnd () {
      return new Promise((resolve, reject) => {
        this.transitionendResolves.push(resolve)
      })
    },
    ontransitionend (ev) {
      this.transitionendResolves.forEach(resolve => {
        resolve(ev)
      })
      this.transitionendResolves = []
      this.$emit('transitionend', ev)
    }
  }
}
</script>
