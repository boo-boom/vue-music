<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">QQ Music</h1>
  </div>
</template>

<script>
export default {
  name: 'MHeader'
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import '~common/css/variable.less';
  @import '~common/css/mixin.less';
  .m-header{
    height: 4.4rem;
    text-align: center;
    color: @color-theme;
    font-size: 0;
    .icon{
      display: inline-block;
      vertical-align: top;
      width: 2.4rem;
      height: 2.6rem;
      margin-top: 0.9rem;
      margin-right: 0.9rem;
      background-size: 2.4rem 2.6rem;
      .bg-img('~common/image/logo');
    }
    .text{
      display: inline-block;
      vertical-align: top;
      line-height: 4.4rem;
      font-size: @font-size-large;
    }
  }
</style>
