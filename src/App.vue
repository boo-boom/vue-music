<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import MHeader from 'components/m_header'
  import Tab from 'components/tab'
  import Player from 'components/player'

  export default {
    name: 'app',
    components: {MHeader, Tab, Player}
  }
</script>

<style rel="stylesheet/less" lang="less">

</style>
