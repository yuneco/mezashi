// import BtnSnd from '@/assets/snd/btn.mp3'
// import CatchSnd from '@/assets/snd/catch.mp3'
// import JumpSnd from '@/assets/snd/jump.mp3'
// import GameOverSnd from '@/assets/snd/over.mp3'
// import ShotSnd from '@/assets/snd/shot.mp3'

// const snds = {
//   btn: new Audio(BtnSnd),
//   catch: new Audio(CatchSnd),
//   jump: new Audio(JumpSnd),
//   gameover: new Audio(GameOverSnd),
//   shot: new Audio(ShotSnd)
// }

import loadSnd from 'audio-loader'
import playSnd from 'audio-play'

const snds = {}
const load = name => {
  loadSnd(`/snd/${name}.mp3`).then(a => { snds[name] = a })
}
load('btn')
load('catch')
load('jump')
load('gameover')
load('shot')

const playSound = name => {
  const audio = snds[name]
  if (!audio) {
    console.warn(`No sound for: ${name}`)
    return
  }
  playSnd(audio)
}

export default playSound
