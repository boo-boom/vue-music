<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="topList" ref="scroll">
      <ul>
        <li class="item" v-for="item in topList" @click="selectItem(item)">
          <div class="icon">
            <img v-lazy="item.picUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.songList">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {playListMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'
  import {getTopList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'

  export default {
    name: 'rank',
    mixins: [playListMixin],
    components: {Scroll, Loading},
    created() {
      this._getTopList();
    },
    data() {
      return {
        topList: []
      }
    },
    methods: {
      handlePlayList(playList) {
        const bottom = playList.length > 0 ? '6rem' : '';
        this.$refs.rank.style.bottom = bottom;
        this.$refs.scroll.refresh();
      },
      selectItem(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        });
        this.setTopList(item);
      },
      _getTopList() {
        getTopList().then((res) => {
          if(res.code === ERR_OK){
            this.topList = res.data.topList;
          }
        })
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "~common/css/variable";
  @import "~common/css/mixin";

  .rank {
    position: fixed;
    top: 8.8rem;
    bottom: 0;
    width: 100%;
    .toplist{
      height: 100%;
      overflow: hidden;
      .item{
        display: flex;
        margin: 0 2rem;
        padding-top: 2rem;
        height: 10rem;
        &:last-child{
          padding-bottom: 2rem;
        }
        .icon{
          flex: 0 0 10rem;
          width: 10rem;
          height: 10rem;
          & > img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .songlist{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 2rem;
          height: 10rem;
          overflow: hidden;
          background: @color-highlight-background;
          color: @color-text-d;
          font-size: @font-size-small;
          .song{
            .no-wrap();
            line-height: 2.6rem;
          }
        }
      }
      .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>

