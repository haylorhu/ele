import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import  "common/style/index.styl"
import './register.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
