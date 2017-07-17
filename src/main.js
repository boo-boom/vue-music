import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import { DOMLoaded, computedREM } from 'assets/js/base';
import 'assets/css/common.less';

fastclick.attach(document.body);

DOMLoaded();
window.addEventListener('resize', () => {
  computedREM();
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
