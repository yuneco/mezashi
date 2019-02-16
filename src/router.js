import Vue from 'vue'
import Router from 'vue-router'
import GameView from './pages/GameView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'game',
      component: GameView
    }
  ]
})
