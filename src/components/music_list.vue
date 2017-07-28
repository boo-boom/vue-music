<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" ref="title">{{name}}</h1>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper">
        <div class="play" ref="playBtn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <scroll class="list" :data="songs" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {prefixStyle} from 'common/js/base'
  import Scroll from 'base/scroll.vue'
  import SongList from 'base/song_list.vue'

  const transform = prefixStyle('transform');
  const backdrop = prefixStyle('backdrop-filter');

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
    data() {
      return {
        scrollY: 0
      }
    },
    created() {
      this.listenScroll = true;
      this.probeType = 3;
    },
    mounted() {
      this.imageHeight = this.$refs.bgImg.clientHeight;
      this.minScrollY = -this.imageHeight + this.$refs.title.clientHeight;
      this.$refs.list.$el.style.top = `${this.imageHeight}px`;
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y | 0;
      },
      back() {
        this.$router.back();
      },
      selectItem(song, index){
        this.selectPlay({
          list: this.songs,
          index: index
        });
      },
      ...mapActions(['selectPlay'])
    },
    watch: {
      scrollY(newY) {
        let scale = 1;
        let zIndex = 0;
        let blur = 0;
        const percent = Math.abs(newY / this.imageHeight) * 2;
        if (newY > 0) {
          scale = 1 + percent;
          zIndex = 70;
        } else {
          blur = Math.min(20, percent * 20);
        }
        if (newY < this.minScrollY) {
          zIndex = 70;
          this.$refs.bgImg.style.paddingBottom = 0;
          this.$refs.bgImg.style.height = `${this.$refs.title.clientHeight}px`;
          this.$refs.playBtn.style.display = 'none';
        } else {
          this.$refs.bgImg.style.paddingBottom = '70%';
          this.$refs.bgImg.style.height = 0;
          this.$refs.playBtn.style.display = '';
        }
        this.$refs.bgImg.style.zIndex = zIndex;
        this.$refs.bgImg.style[transform] = `scale(${scale})`;
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
      }
    },
    computed: {
      bgStyle() {
        return `background-image: url(${this.avatar});`
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/css/variable.less";
  @import "~common/css/mixin.less";
  .music-list {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: @color-background;
    .back {
      position: absolute;
      top: 0;
      left: 0.6rem;
      z-index: 80;
      .icon-back {
        display: block;
        padding: 1rem;
        font-size: @font-size-large-x;
        color: @color-theme;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 80;
      width: 80%;
      text-align: center;
      line-height: 4rem;
      font-size: @font-size-large;
      color: @color-text;
      .no-wrap();
    }
    .bg-image {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 70%;
      //background: url("../common/image/test_big.jpg") no-repeat;
      background-repeat: no-repeat;
      background-size: cover;
      .play-wrapper {
        position: absolute;
        bottom: 2rem;
        z-index: 50;
        width: 100%;
        .play {
          box-sizing: border-box;
          width: 13.5rem;
          padding: 0.7rem 0;
          margin: 0 auto;
          text-align: center;
          border-radius: 10rem;
          border: 1px solid @color-theme;
          color: @color-theme;
          font-size: 0;
          .icon-play {
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.6rem;
            font-size: @font-size-medium-x;
          }
          .text {
            display: inline-block;
            vertical-align: middle;
            font-size: @font-size-medium;
          }
        }
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .list {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 60;
      width: 100%;
      //overflow: hidden;
      background: @color-background;
    }
    .song-list-wrapper {
      padding: 2rem 3rem;
      background: @color-background;
    }
  }
</style>
