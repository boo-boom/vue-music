<template>
  <div class="player" v-show="playList.length>0">
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{currentSong.name}}</h1>
          <h2 class="subtitle">{{currentSong.singer}}</h2>
        </div>
        <div class="middle" ref="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">asdasdas</div>
            </div>
            <div class="lyric-wrapper">
              <div>
                <p>wqewqeqwewqe</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <div class="dot cd"></div>
            <div class="dot lyric"></div>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i class="icon-prev" @click="prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i :class="playIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i class="icon-next" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :src="currentSong.image" :class="cdCls" ref="mini">
        </div>
        <div class="text">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.singer}}</p>
        </div>
        <div class="control">
          <i :class="miniIcon" @click.stop="togglePlaying"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {prefixStyle} from 'common/js/base'
  import animations from 'create-keyframe-animation'
  import progressBar from './../base/progress_bar'

  const transition = prefixStyle('transition');
  const transform = prefixStyle('transform');

  export default {
    name: 'player',
    components: {progressBar},
    data() {
      return {
        currentTime: 0,
        songReady: false,
      }
    },
    methods: {
      back() {
        this.setFullScreen(false);
      },
      open() {
        this.setFullScreen(true);
      },
      togglePlaying() {
        if (!this.songReady) {
          return
        }
        this.setPlayingState(!this.playing);
      },
      prev() {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
        this.songReady = false;
      },
      next() {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex + 1;
        if (index === this.playList.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
        this.songReady = false;
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime;
      },
      format(interval) {
        interval = interval | 0;
        const minute = interval / 60 | 0;
        const second = this._pad(interval % 60);
        return `${minute}:${second}`;
      },
      ready() {
        this.songReady = true;
      },
      error() {
        this.songReady = true;
      },
      enter(el, done) {
        const {x, y, scale} = this._getPosScale();
        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        };
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        });
        animations.runAnimation(this.$refs.cdWrapper, 'move', done);
      },
      afterEnter(el) {
        animations.unregisterAnimation('move');
        this.$refs.cdWrapper.style.animation = '';
      },
      leave(el, done) {
        const {x, y, scale} = this._getPosScale();
        this.$refs.cdWrapper.style[transition] = 'all 0.4s';
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
        this.$refs.cdWrapper.addEventListener('transitionend', done);
      },
      afterLeave(el) {
        this.$refs.cdWrapper.style[transition] = '';
        this.$refs.cdWrapper.style[transform] = '';
      },
      _getPosScale() {
        /*cd从小到大的变化x,y:x,y轴偏移距离,scale:缩放倍数*/
        const mini = this.$refs.mini;
        const targetWidth = mini.clientWidth;
        const offsetLeft = mini.offsetLeft + targetWidth / 2;
        const offsetBottom = mini.offsetTop + targetWidth / 2;
        const cdWidth = window.innerWidth * 0.8 / 2;
        const cdTop = this.$refs.middle.offsetTop;
        const x = -(cdWidth - offsetLeft);
        const y = window.innerHeight - cdTop - cdWidth - offsetBottom;
        const scale = targetWidth / cdWidth;
        return {x, y, scale}
      },
      _pad(num, n = 2) {
        let len = num.toString().length;
        if(len < n) {
          return '0' + num;
        }
        return num
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      })
    },
    watch: {
      currentSong() {
        this.$nextTick(() => {
          this.$refs.audio.play();
        })
      },
      playing(newPlaying) {
        const audio = this.$refs.audio;
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause();
        })
      }
    },
    computed: {
      cdCls() {
        return this.playing ? 'play' : 'play pause';
      },
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play';
      },
      miniIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
      ...mapGetters(['playing', 'fullScreen', 'playList', 'currentSong', 'currentIndex'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/css/variable";
  @import "~common/css/mixin";
  .player {
    .normal-player {
      position: fixed;
      z-index: 99;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: @color-background;
      .background {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
        width: 100%;
        filter: blur(20px);
      }
      .top {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 6rem;
        .back {
          position: absolute;
          top: 0;
          left: 1rem;
          z-index: 10;
          width: 4rem;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-90deg);
          & > i {
            color: @color-theme;
            font-size: @font-size-large-x;
          }
        }
        .title, .subtitle {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 9;
          width: 100%;
          height: 4rem;
          line-height: 4rem;
          text-align: center;
          font-size: @font-size-large;
          color: @color-theme;
        }
        .subtitle {
          top: 4rem;
          height: 2rem;
          line-height: 2rem;
          font-size: @font-size-medium;
          color: @color-text;
        }
      }
      .middle {
        position: absolute;
        top: 8rem;
        left: 0;
        width: 100%;
        .middle-l {
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper {
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            .cd {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 1rem solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              overflow: hidden;
              &.play {
                animation: rotate 20s linear infinite;
              }
              &.pause {
                animation-play-state: paused;
              }
              .image {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
          }
          .playing-lyric-wrapper {
            text-align: center;
            margin-top: 3rem;
            .playing-lyric {
              height: 2rem;
              line-height: 2rem;
              font-size: @font-size-medium;
              color: @color-text-l;
            }
          }
          .lyric-wrapper p {
            text-align: center;
            height: 2rem;
            line-height: 2rem;
            font-size: @font-size-medium;
            color: @color-text-l;
          }
        }
      }
      .bottom {
        position: absolute;
        bottom: 5rem;
        width: 100%;
        .dot-wrapper {
          text-align: center;
          .dot {
            display: inline-block;
            vertical-align: middle;
            margin: 0 0.4rem;
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            background: @color-text-l;
          }
        }
        .progress-wrapper {
          display: flex;
          align-items: center;
          width: 80%;
          margin: 0 auto;
          padding: 1rem 0;
          .time {
            color: @color-text;
            font-size: @font-size-small;
            flex: 0 0 3rem;
            line-height: 3rem;
            width: 3rem;
            &.time-l {
              text-align: left;
            }
            &.time-r {
              text-align: right;
            }
          }
        }
        .operators {
          display: flex;
          align-items: center;
          text-align: center;
          .icon {
            flex: 1;
            color: @color-theme;
            &.disable{
              color: @color-theme-d;
            }
            i {
              font-size: 3rem;
            }
          }
          .i-center {
            i {
              font-size: 4rem;
            }
          }
        }
      }
      &.normal-enter-active, &.normal-leave-active {
        transition: all 0.4s;
        .top, .bottom {
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
      }
      &.normal-enter, &.normal-leave-to {
        opacity: 0;
        .top {
          transform: translate3d(0, -100px, 0);
        }
        .bottom {
          transform: translate3d(0, 100px, 0);
        }
      }
    }
    .mini-player {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 6rem;
      z-index: 100;
      background: @color-highlight-background;
      display: flex;
      align-items: center;
      &.mini-enter-active, &.mini-leave-active {
        transition: all 0.4s;
      }
      &.mini-enter, &.mini-leave-to {
        opacity: 0;
      }
      .icon {
        flex: 0 0 4rem;
        width: 4rem;
        padding: 0 1rem 0 2rem;
        img {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 2rem;
        overflow: hidden;
        .name {
          margin-bottom: 0.2rem;
          .no-wrap();
          font-size: @font-size-medium;
          color: @color-text;
        }
        .desc {
          .no-wrap();
          font-size: @font-size-small;
          color: @color-text-d;
        }
      }
      .control {
        flex: 0 0 3rem;
        width: 3rem;
        padding: 0 1rem;
        .icon-play-mini, .icon-pause-mini, .icon-playlist {
          font-size: 3rem;
          color: @color-theme-d;
        }
        .icon-mini {
          font-size: 3.2rem;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
