<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box @query="onChangeQuery" ref="searchBox"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="item in hotKey" @click="addQuery(item.k)">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query"></suggest>
    </div>
  </div>
</template>

<script>
  import SearchBox from 'base/search_box'
  import Suggest from 'components/suggest'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'

  export default {
    name: 'search',
    components: {SearchBox, Suggest},
    created() {
      this._getHotKey();
    },
    data() {
      return {
        hotKey: [],
        query: ''
      }
    },
    methods: {
      onChangeQuery(query) {
        this.query = query;
      },
      addQuery(query) {
        this.$refs.searchBox.setQuery(query);
      },
      _getHotKey() {
        getHotKey().then((res) => {
          if(res.code === ERR_OK){
            this.hotKey = res.data.hotkey.slice(0, 10);
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "~common/css/variable";

  .search {
    .search-box-wrapper{}
    .shortcut-wrapper{
      position: fixed;
      top: 14.5rem;
      bottom: 0;
      width: 100%;
      .shortcut{
        height: 100%;
        overflow: hidden;
        .hot-key{
          margin: 0 2rem 2rem 2rem;
          .title{
            margin-bottom: 2rem;
            font-size: @font-size-medium;
            color: @color-text-l;
          }
          .item{
            display: inline-block;
            padding: 0.5rem 1rem;
            margin: 0 2rem 1rem 0;
            border-radius: 0.6rem;
            background: @color-highlight-background;
            font-size: @font-size-medium;
            color: @color-text-d;
          }
        }
      }
    }
    .search-result{
      position: fixed;
      width: 100%;
      top: 15rem;
      bottom: 0;
    }
  }
</style>
