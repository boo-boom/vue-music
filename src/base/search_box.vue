<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" v-model="query" :placeholder="placeholder"/>
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = '';
      },
      setQuery(query) {
        this.query = query;
      }
    },
    watch: {
      query(newQuery) {
        this.$emit('query', newQuery);
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/css/variable";

  .search-box{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 1rem;
    height: 4rem;
    background: @color-highlight-background;
    .icon-search{
      font-size: 2.4rem;
      color: @color-text-l;
    }
    .box{
      flex: 1;
      margin: 0 0.5rem;
      line-height: 1.8rem;
      background: @color-highlight-background;
      color: @color-text;
      font-size: @font-size-medium;
      &::placeholder{
        color: @color-text-d;
      }
    }
    .icon-dismiss{
      padding: 0 0.5rem;
      font-size: 1.6rem;
      color: @color-text-l;
    }
  }
</style>
