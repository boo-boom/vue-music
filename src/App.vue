<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m_header';
import Tab from 'components/tab';
export default {
  name: 'app',
  components: { MHeader, Tab }
}
</script>

<style rel="stylesheet/less" lang="less">

</style>
