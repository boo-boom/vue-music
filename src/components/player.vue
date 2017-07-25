<template>
  <div class="player" v-show="playListL.length>0">
    <div class="normal-player" v-show="fullScreen">
      <ul>
        <li v-for="item in playListL">{{item.name}}</li>
      </ul>
    </div>
    <div class="mini-player" v-show="!fullScreen">this is template body</div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'player',
    computed: {
      ...mapGetters(['fullScreen', 'playListL'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~assets/css/variable";
  @import "~assets/css/mixin";
  .player {
    .normal-player {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 150;
      background: @color-background;
    }
    .mini-player {
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 60px;
      z-index: 180;
      background: @color-highlight-background;
    }
  }
</style>
