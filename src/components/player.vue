<template>
  <div class="player" v-show="playListL.length>0">
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
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
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
            <span class="time time-l">20</span>
            <div class="progress-bar-wrapper">
              进度条
            </div>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center" @click="togglePlaying">
              <i class="icon-play"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
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
        <div class="control" @click.stop="togglePlaying">
          <i class="icon-play-mini"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio"></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import animation from 'create-keyframe-animation'

  export default {
    name: 'player',
    updated(){
      this._getPosScale();
    },
    methods: {
      back() {
        this.setFullScreen(false);
      },
      open() {
        this.setFullScreen(true);
      },
      togglePlaying() {
        this.setPlayingState(!this.playing);
      },
      enter(el, done) {
      },
      afterEnter(el) {
      },
      leave(el, done) {
      },
      afterLeave(el) {
      },
      _getPosScale(){
        const mini = this.$refs.mini;
        const offsetLeft = mini.offsetLeft;
        console.log(offsetLeft);
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE'
      })
    },
    watch: {
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
      ...mapGetters(['playing', 'fullScreen', 'playListL', 'currentSong'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~assets/css/variable";
  @import "~assets/css/mixin";
  .player {
    .normal-player {
      position: fixed;
      z-index: 99;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
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
        }
        .operators {
          display: flex;
          align-items: center;
          text-align: center;
          .icon {
            flex: 1;
            color: @color-theme;
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
      &.normal-enter-to, &.normal-leave-to {
        transition: all 0.4s linear;
        .top, .bottom {
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
      }
      &.normal-enter, &.normal-leave-to {
        opacity: 0;
        .top {
          transform: translate3d(0, -100%, 0);
        }
        .bottom {
          transform: translate3d(0, 100%, 0);
        }
      }
    }
    .mini-player {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 6rem;
      background: @color-highlight-background;
      display: flex;
      align-items: center;
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
