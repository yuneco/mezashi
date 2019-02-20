import MathUtil from './MathUtil'
import Easing from 'easing-functions'

export default class Tween {
  constructor (target) {
    this._target = target
  }

  get Easing () {
    return Easing
  }

  async to (vals, ms, easingFunction) {
    await new Promise(resolve => {
      const startMs = Date.now()
      const startVals = {}
      Object.keys(vals).forEach(k => { startVals[k] = this._target[k] })
      const update = () => {
        const midMs = Date.now()
        const r = Math.min(1, (midMs - startMs) / ms)
        const easedR = easingFunction ? easingFunction(r) : r
        this._apply(startVals, vals, easedR)
        if (r === 1) {
          resolve()
        } else {
          window.requestAnimationFrame(update)
        }
      }
      update()
    })
  }

  _apply (from, to, r) {
    Object.keys(to).forEach(k => {
      const fromVal = from[k]
      const toVal = to[k]
      const isNum = MathUtil.isNumber(fromVal) && MathUtil.isNumber(toVal)
      const midVal = isNum ? fromVal + (toVal - fromVal) * r : (r > 0.5 ? toVal : fromVal)
      // console.log(k)
      this._target[k] = midVal
    })
  }
}
