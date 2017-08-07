<template>
  <div class="progress-circle">
    <svg :style="{'width': `${radius}rem`,'height': `${radius}rem`}" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      radius: {
        type: Number,
        default: 3.2
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    computed: {
      dashArray() {
        return Math.PI * 100;     //100是圆的直径
      },
      dashOffset() {
        return (1 - this.percent) * this.dashArray;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/css/variable";
  .progress-circle{
    position: relative;
    circle{
      stroke-width: 0.8rem;
      transform-origin: center;
      &.progress-background{
        transform: scale(0.9);
        stroke: @color-theme-d;
      }
      &.progress-bar{
        transform: scale(0.9) rotate(-90deg);
        stroke: @color-theme;
      }
    }
  }
</style>
