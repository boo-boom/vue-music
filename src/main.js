import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import {DOMLoaded, computedREM} from 'assets/js/base';
import 'assets/css/common.less';

fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require('assets/image/default.png')
});

DOMLoaded();
window.addEventListener('resize', () => {
  computedREM();
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
