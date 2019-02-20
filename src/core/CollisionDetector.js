import boxIntersect from 'box-intersect'

const upperFirst = text => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
const diffNewResults = (lastArr, newArr) => {
  if (!newArr.length) { return [] }
  if (!lastArr.length) { return newArr }
  const lastUidArr = lastArr.map(pare => pare[0]._uid + '/' + pare[1]._uid)
  const newUidArr = newArr.map(pare => pare[0]._uid + '/' + pare[1]._uid)
  const news = []
  newUidArr.forEach((pareId, index) => {
    if (!lastUidArr.includes(pareId)) {
      // new //
      news.push(newArr[index])
    }
  })
  return news
}

export default class CollisionDetector {
  constructor () {
    this._comps = []
    this.safeMargin = 0.1
    this._lastResult = []
  }
  add (...comps) {
    comps.forEach(c => {
      if (!this._comps.includes(c)) {
        this._comps.push(c)
      }
    })
  }
  clear () {
    this._comps.length = 0
  }
  detect () {
    const boxes = this._comps.map(c => {
      const el = c.$el
      if (!el) { return null }
      const box = el.getBoundingClientRect()
      const marginX = box.width * this.safeMargin
      const marginY = box.height * this.safeMargin
      return [ box.x + marginX, box.y + marginY, box.x + box.width - marginX, box.y + box.height - marginY ]
    }).filter(b => b)
    const result = boxIntersect(boxes).map(indexes => {
      const [i1, i2] = indexes
      const c1 = this._comps[i1]
      const c2 = this._comps[i2]
      return [c1, c2]
    })
    const diffedRes = diffNewResults(this._lastResult, result)
    this._lastResult = result
    diffedRes.forEach(pare => {
      const [c1, c2] = pare
      const c1Name = upperFirst(c1.$options._componentTag)
      const c2Name = upperFirst(c2.$options._componentTag)
      if (c1.collide) {
        c1.collide(c2, c2Name, 0)
      }
      if (c2.collide) {
        c2.collide(c1, c1Name, 1)
      }
    })
    return diffedRes
  }
}
