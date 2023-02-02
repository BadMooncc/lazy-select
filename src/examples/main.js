import Vue from 'vue'
import App from './App.vue'
import lazySelect from '../packages/index.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element, {
  size: 'small',
})
// Vue.component('lazy-select', lazySelect)
Vue.use(lazySelect)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
