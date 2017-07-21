<template>
  <transition name="slide">
    <div class="singer-detail">
      <div style="font-size: 30px;">{{test}}||{{testGet}}||{{a1}}||{{b1}}</div>
      <button @click="testAts">click!</button>
      <button @click="sda">click!</button>
      <button @click="fn1">click!</button>
    </div>
  </transition>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'singerDetail',
    components: {},
    computed: {
      ...mapState(['test']),
      ...mapGetters(['testGet','a1','b1'])
    },
    methods: {
      ...mapMutations(['testMts','fn1']),
      ...mapActions(['testAts','sda']),
      fn1(){
        let a = {
          a1: '1',
          a2: '2'
        };
        console.log('j'.concat(a.a1,a.a2));
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all 0.2s linear;
  }
  .slide-enter, .slide-leave-active {
    transform: translate3d(100%, 0, 0);
  }
  .singer-detail {
    position: fixed;
    top: 8.8rem;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    background-color: #ccc;
  }
</style>
