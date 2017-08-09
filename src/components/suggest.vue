<template>
  <scroll class="suggest" :data="result">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </scroll>
</template>

<script>
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import Scroll from 'base/scroll'

  export default {
    components: {Scroll},
    props: {
      query: {
        type: String,
        default: ''
      },
      zhida: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        result: null,
        page: 1,
        perpage: 20,
        singer: 'singer'
      }
    },
    methods: {
      search() {
        search(this.query, this.page, this.zhida, this.perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data);
          }
        })
      },
      getDisplayName(item) {
        if(item.type === this.singer){
          return item.singername
        }else{
          return `${item.name}-${item.singer}`
        }
      },
      getIconCls(item) {
        if(item.type === this.singer) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      _genResult(data) {
        let ret = [];
        if (data.zhida && data.zhida.singermid) {
          data.zhida['type'] = this.singer;
          ret.push(data.zhida);
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list));
        }
        return ret;
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach((item) => {
          if(item.songid && item.albummid){
            ret.push(createSong(item));
          }
        });
        return ret;
      }
    },
    watch: {
      query(newQuery) {
        this.query = newQuery;
        this.search();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "~common/css/variable";
  @import "~common/css/mixin";
  .suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 3rem;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 2rem;
        .icon {
          flex: 0 0 3rem;
          width: 3rem;
          [class^='icon-'] {
            font-size: 1.4rem;
            color: @color-text-l;
          }
        }
        .name {
          flex: 1;
          font-size: @font-size-medium;
          color: @color-text-d;
          overflow: hidden;
          .text {
            .no-wrap();
          }
        }
      }
    }
  }
</style>
