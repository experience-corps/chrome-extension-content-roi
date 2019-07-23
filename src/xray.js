global.browser = require('webextension-polyfill')
import Vue from 'vue'
Vue.prototype.$browser = global.browser
import App from './XrayV'

(() => {
	var div = document.createElement('div');
  div.id = 'injected_container'
  document.body.insertBefore(div, document.body.childNodes[0]);
  
  /* eslint-disable no-new */
  const v = new Vue({
    el: '#injected_container',
    render: h => h(App)
  })
})();