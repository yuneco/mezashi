import BtnSnd from '@/assets/snd/btn.mp3'
import CatchSnd from '@/assets/snd/catch.mp3'
import JumpSnd from '@/assets/snd/jump.mp3'
import GameOverSnd from '@/assets/snd/over.mp3'
import ShotSnd from '@/assets/snd/shot.mp3'

const snds = {
  btn: BtnSnd,
  catch: CatchSnd,
  jump: JumpSnd,
  gameover: GameOverSnd,
  shot: ShotSnd
}

const playSound = name => {
  const snd = snds[name]
  if (!snd) {
    console.warn(`No sound for: ${name}`)
    return
  }
  const audio = new Audio(snd)
  audio.play()
}

export default playSound
