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
        <div class="middle" ref="middle"
             @touchstart.prevent="middleTouchStart"
             @touchmove.prevent="middleTouchMove"
             @touchend="middleTouchEnd">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <scroll class="middle-r" :data="currentLyric && currentLyric.lines" ref="lyric">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p class="text" :class="{'current':currentLineNum===index}" v-for="(item,index) in currentLyric.lines"
                   ref="lyricList">{{item.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <div class="dot" :class="{'active':currentShow=='cd'}"></div>
            <div class="dot" :class="{'active':currentShow=='lyric'}"></div>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i :class="iconMode" @click="changeMode"></i>
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
          <progress-circle :radius="radius" :percent="percent">
            <i class="icon-mini" :class="miniIcon" @click.stop="togglePlaying"></i>
          </progress-circle>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @ended="end" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {prefixStyle, shuffle, findIndex} from 'common/js/base'
  import animations from 'create-keyframe-animation'
  import progressBar from 'base/progress_bar'
  import progressCircle from 'components/progress_circle'
  import {playMode} from 'common/js/config'
  import Lyric from 'lyric-parser'
  import Scroll from 'base/scroll'

  const transition = prefixStyle('transition');
  const transform = prefixStyle('transform');
  const transitionDuration = prefixStyle('transition-duration');

  export default {
    name: 'player',
    components: {progressBar, progressCircle, Scroll},
    created() {
      this.touch = {};
    },
    data() {
      return {
        currentTime: 0,
        songReady: false,
        radius: 3.2,
        currentLyric: null,
        currentLineNum: 0,
        currentShow: 'cd',
        playingLyric: '',
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
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
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
      end() {
        if (this.mode === playMode.loop) {
          this.loop();
        } else {
          this.next();
        }
      },
      loop() {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
        if (this.currentLyric) {
          this.currentLyric.seek(0);
        }
      },
      changeMode() {
        let mode = (this.mode + 1) % 3;
        let list = null;
        if (mode === playMode.random) {
          list = shuffle(this.sequenceList);
        } else {
          list = this.sequenceList;
        }
        this.setPlayerMode(mode);
        this.setCurrentIndex(findIndex(list, this.currentSong));
        this.setPlayList(list);
      },
      onProgressBarChange(percent) {
        const currentTime = this.currentSong.duration * percent;
        this.$refs.audio.currentTime = currentTime;
        if (!this.playing) {
          this.togglePlaying();
        }
        this.currentLyric.seek(currentTime * 1000);
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
      getLyric() {
        this.currentSong.getLyric().then((lyric) => {
          if(this.currentSong.lyric !== lyric){
            return
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric);
          if (this.playing) {
            this.currentLyric.play();
          }
        });
      },
      handleLyric({lineNum, txt}) {
        this.currentLineNum = lineNum;
        if (lineNum > 5) {
          this.$refs.lyric.scrollToElement(this.$refs.lyricList[lineNum - 5], 1000);
        } else {
          this.$refs.lyric.scrollTo(0, 0, 1000);
        }
        this.playingLyric = txt;
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
      middleTouchStart(e) {
        this.touch.startX = e.touches[0].pageX;
        this.touch.startY = e.touches[0].pageY;
      },
      middleTouchMove(e) {
        let deltaX = e.touches[0].pageX - this.touch.startX;
        let deltaY = e.touches[0].pageY - this.touch.startY;
        if(Math.abs(deltaY) > Math.abs(deltaX)){
          return
        }
        let left = this.currentShow === 'cd' ? 0 : -window.innerWidth;
        let offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX));
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
        this.$refs.lyric.$el.style[transitionDuration] = `0s`;
        this.$refs.lyric.$el.style[transform] = `translateX(${offsetWidth}px)`;
        this.$refs.middleL.style[transitionDuration] = `0ms`;
        this.$refs.middleL.style.opacity = 1 - this.touch.percent;
      },
      middleTouchEnd() {
        let offsetWidth, opacity;
        if(this.currentShow === 'cd'){
          if(this.touch.percent > 0.1){
            offsetWidth = -window.innerWidth;
            opacity = 0;
            this.currentShow = 'lyric';
          }else{
            opacity = 1;
            offsetWidth = 0;
          }
        }else {
          if(this.touch.percent < 0.9){
            opacity = 1;
            offsetWidth = 0;
            this.currentShow = 'cd';
          }else{
            opacity = 0;
            offsetWidth = -window.innerWidth;
          }
        }
        let time = 200;
        this.$refs.lyric.$el.style[transitionDuration] = `${time}ms`;
        this.$refs.lyric.$el.style[transform] = `translateX(${offsetWidth}px)`;
        this.$refs.middleL.style[transitionDuration] = `${time}ms`;
        this.$refs.middleL.style.opacity = opacity;
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
        if (len < n) {
          return '0' + num;
        }
        return num
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayerMode: 'SET_PLAYER_MODE',
        setPlayList: 'SET_PLAYLIST'
      })
    },
    watch: {
      currentSong(newSong, oldSong) {
        if(!newSong.id){
          return
        }
        if (newSong.id === oldSong.id) {
          return
        }
        if (this.currentLyric) {
          this.currentLyric.stop();
          this.currentTime = 0;
          this.playingLyric = '';
          this.currentLineNum = 0;
        }
        this.$nextTick(() => {
          this.$refs.audio.play();
          this.getLyric();
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
      percent() {
        return this.currentTime / this.currentSong.duration;
      },
      iconMode() {
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
      },
      ...mapGetters(['playing', 'fullScreen', 'playList', 'currentSong', 'currentIndex', 'mode', 'sequenceList'])
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
        bottom: 17rem;
        left: 0;
        width: 100%;
        white-space: nowrap;
        .middle-l {
          display: inline-block;
          vertical-align: top;
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
        .middle-r {
          display: inline-block;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .lyric-wrapper {
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
            .text {
              line-height: 3.2rem;
              color: @color-text-l;
              font-size: @font-size-medium;
              &.current {
                color: @color-text;
              }
            }
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
            &.active {
              width: 2rem;
              border-radius: 0.5rem;
              background: @color-text-ll;
            }
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
          .progress-bar-wrapper {
            flex: 1;
          }
        }
        .operators {
          display: flex;
          align-items: center;
          text-align: center;
          .icon {
            flex: 1;
            color: @color-theme;
            &.disable {
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
