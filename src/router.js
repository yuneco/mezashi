import Vue from 'vue'
import Router from 'vue-router'
import GameView from './pages/GameView.vue'
import HomeView from './pages/HomeView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    }
  ]
})
