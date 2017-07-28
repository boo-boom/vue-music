<template>
  <div class="progress-bar">
    <div class="bar-inner">
      <div class="progress"></div>
      <div class="progress-btn-wrapper">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'progressBar'
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/css/variable";

  .progress-bar{
    height: 3rem;
    background: @color-theme;
    .bar-inner{
      position: relative;
      top: 1.3rem;
      height: 0.4rem;
      background: rgba(0, 0, 0, 0.3);
      .progress{
        position: absolute;
        height: 100%;
        background: @color-theme;
        .progress-btn-wrapper{
          position: absolute;
          left: -0.85rem;
          top: -1.3rem;
          width: 3rem;
          height: 3rem;
          .progress-btn{
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
  }
</style>
