<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(song,index) in songs" @click="selectItem(song,index)">
        <!--<div class="rank">
          <span class="text">{{index}}</span>
        </div>-->
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'songList',
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    created(){},
    methods: {
      getDesc(song){
        return `${song.singer} · ${song.album}`;
      },
      selectItem(song, index){
        this.$emit('select', song, index);
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~assets/css/variable.less";
  @import "~assets/css/mixin.less";

  .song-list{
    .item{
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 6.4rem;
      font-size: @font-size-medium;
      .rank{
        flex: 0 0 2.5rem;
        width: 2.5rem;
        margin-right: 3rem;
        text-align: center;
        .text{
          color: @color-theme;
          font-size: @font-size-large;
        }
      }
      .content{
        flex: 1;
        line-height: 2rem;
        overflow: hidden;
        .name{
          color: @color-text;
          .no-wrap();
        }
        .desc{
          color: @color-text-d;
          margin-top: 0.4rem;
          .no-wrap();
        }
      }
    }
  }
</style>
