import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'production') {
  // activate GA only under the release env
  Vue.use(VueAnalytics, {
    id: 'UA-121209972-2',
    router
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
