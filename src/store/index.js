import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  test: false,
  a1: 1,
  b1: 1
};

const getters = {
  testGet: state => state.test ? 1111 : 22222,
  a1: state => state.a1,
  b1: state => state.b1
};

const mutations = {
  testMts(state) {
    state.test = !state.test;
  },
  fn1(state) {
    state.a1++
  },
  fn2(state) {
    state.b1++
  }
};

const actions = {
  testAts({commit}) {
    commit('testMts');
    commit('fn1');
  },
  sda({commit}) {
    commit('fn2');
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});


