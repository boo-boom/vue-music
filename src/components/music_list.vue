<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{name}}</h1>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <!--<div class="bg-layer"></div>-->
    <scroll class="list" :data="songs" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll.vue'
  import SongList from 'base/song_list.vue'

  export default {
    name: 'musicList',
    components: {Scroll, SongList},
    props: {
      songs: {
        type: Array,
        default: []
      },
      name: {
        type: String,
        default: ''
      },
      avatar: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        scrollY: 0
      }
    },
    created(){
      this.listenScroll = true;
      this.probeType = 3;
    },
    mounted(){
      this.imageHeight = this.$refs.bgImg.clientHeight;
      this.songList = this.$refs.list.$el;
      this.songList.style.top = `${this.imageHeight}px`;
    },
    methods: {
      scroll(pos){
        this.scrollY = pos.y | 0;
        if(this.scrollY + this.imageHeight <= 40){
          return
        }
        this.$refs.bgImg.style.paddingBottom = this.scrollY + this.imageHeight + 'px';
        this.$refs.bgImg.style.zIndex = 999;
        console.log(this.scrollY + this.imageHeight);
      }
    },
    watch: {
      songs(){
        console.log(this.$refs.bgImg.clientHeight);
      }
    },
    computed: {
      bgStyle(){
        return `background-image: url(${this.avatar});`
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~assets/css/variable.less";
  @import "~assets/css/mixin.less";

  .music-list {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: @color-background;
    .back{
      position: absolute;
      top: 0;
      left: 0.6rem;
      z-index: 50;
      .icon-back{
        display: block;
        padding: 1rem;
        font-size: @font-size-large-x;
        color: @color-theme;
      }
    }
    .title{
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 40;
      width: 80%;
      text-align: center;
      line-height: 4rem;
      font-size: @font-size-large;
      color: @color-text;
      .no-wrap();
    }
    .bg-image{
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 70%;
      //background: url("../assets/image/test_big.jpg") no-repeat;
      background-repeat: no-repeat;
      background-size: cover;
      .play-wrapper{
        position: absolute;
        bottom: 2rem;
        z-index: 50;
        width: 100%;
        .play{
          box-sizing: border-box;
          width: 13.5rem;
          padding: 0.7rem 0;
          margin: 0 auto;
          text-align: center;
          border-radius: 10rem;
          border: 1px solid @color-theme;
          color: @color-theme;
          font-size: 0;
          .icon-play{
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.6rem;
            font-size: @font-size-medium-x;
          }
          .text{
            display: inline-block;
            vertical-align: middle;
            font-size: @font-size-medium;
          }
        }
      }
      .filter{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7,17,27,0.4);
      }
    }
    .list{
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 60;
      width: 100%;
      //overflow: hidden;
      background: @color-background;
    }
    .song-list-wrapper{
      padding: 2rem 3rem;
      background: @color-background;
    }
  }
</style>
