import './polyfills'
import './web-components'
import './components'

import * as Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
