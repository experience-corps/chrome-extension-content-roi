global.browser = require('webextension-polyfill')
import Vue from 'vue'
import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts'
// import Column2D from 'fusioncharts/fusioncharts.charts'
import Gantt from 'fusioncharts/fusioncharts.gantt'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import vuetify from './plugins/vuetify.js'
// Vue.use(VueFusionCharts, FusionCharts, FusionTheme, Gantt, Timelines)
Vue.use(VueFusionCharts, FusionCharts, FusionTheme, Gantt);
Vue.prototype.$browser = global.browser
import App from './XrayV'

(() => {
	var div = document.createElement('div');
  div.id = 'injected_container'
  document.body.insertBefore(div, document.body.childNodes[0]);
  
  /* eslint-disable no-new */
  const v = new Vue({
    el: '#injected_container',
    vuetify,
    render: h => h(App)
  })
})();