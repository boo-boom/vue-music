<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart="eventTouchStart"
           @touchmove="eventTouchMove"
           @touchend="eventTouchEnd">
        <div class="progress-btn" ref="btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {prefixStyle} from 'common/js/base'

  const transform = prefixStyle('transform');

  export default {
    name: 'progressBar',
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      eventTouchStart(e) {
        this.touch.initiated = false;
        this.touch.startX = e.touches[0].pageX;
        this.touch.left = this.$refs.progress.clientWidth;
      },
      eventTouchMove(e) {
        this.touch.initiated = true;
        const deltaX = e.touches[0].pageX - this.touch.startX;
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - this.$refs.btn.offsetWidth / 2, Math.max(0, deltaX + this.touch.left));
        this._offset(offsetWidth);
      },
      eventTouchEnd() {
        this.touch.initiated = false;
        this._triggerPercent();
      },
      progressClick(e) {
        const rect = this.$refs.progressBar.getBoundingClientRect();
        const offsetWidth = e.pageX - rect.left - this.$refs.btn.offsetWidth / 2;
        this._offset(offsetWidth);
        this._triggerPercent();
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`;
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
      },
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - this.$refs.btn.offsetWidth / 2;
        const percent = this.$refs.progress.clientWidth / barWidth;
        this.$emit('percentChange', percent);
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - this.$refs.btn.offsetWidth / 2;
          const offsetWidth = barWidth * newPercent;
          this._offset(offsetWidth);
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/css/variable";
  .progress-bar {
    height: 3rem;
    .bar-inner {
      position: relative;
      top: 1.3rem;
      height: 0.4rem;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: @color-theme;
      }
      .progress-btn-wrapper {
        position: absolute;
        left: -0.85rem;
        top: -1.3rem;
        width: 3rem;
        height: 3rem;
        .progress-btn {
          position: relative;
          top: 0.7rem;
          left: 0.7rem;
          box-sizing: border-box;
          width: 1.6rem;
          height: 1.6rem;
          border: 3px solid @color-text;
          border-radius: 50%;
          background: @color-theme;
        }
      }
    }
  }
</style>
