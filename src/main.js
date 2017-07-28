import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import {DOMLoaded, computedREM} from 'common/js/base';
import 'common/css/common.less';

fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
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
