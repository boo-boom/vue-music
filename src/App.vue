<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <router-view></router-view>
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

<style>

</style>
