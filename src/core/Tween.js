import MathUtil from './MathUtil'

export default class Tween {
  constructor (target) {
    this._target = target
  }
  async to (vals, ms) {
    await new Promise(resolve => {
      const startMs = Date.now()
      const startVals = {}
      Object.keys(vals).forEach(k => { startVals[k] = this._target[k] })
      resolve()
      const update = () => {
        const midMs = Date.now()
        const r = Math.min(1, (midMs - startMs) / ms)
        this._apply(startVals, vals, r)
        if (r === 1) {
          console.log('TW Resolved')
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
      this._target[k] = midVal
      // console.log(`TW ${k}=${midVal}, from=${fromVal}, toVal=${toVal}, isMun=${isNum}, r=${r}`, from)
    })
  }
}
