<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="item in recommends">
              <a href="javasctipt:;">
                <!-- :href="item.linkUrl" -->
                <!-- item.id -->
                <img class="needsclick" :src="item.picUrl" @load="loadImage"><!-- needsclick: fastclick不阻止事件 -->
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList" @click="selectItem(item)">
              <div class="icon">
                <img v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {ERR_OK} from 'api/config';
  import {getRecommend, getDiscList} from 'api/recommend';
  import Slider from 'base/slider';
  import Loading from 'base/loading';
  import Scroll from 'base/scroll';
  import {playListMixin} from 'common/js/mixin';

  export default {
    name: 'recommend',
    mixins: [playListMixin],
    components: {Slider, Loading, Scroll},
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
      this._getRecommend();
      this._getDiscList();
    },
    methods: {
      handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '6rem' : '';
        this.$refs.recommend.style.bottom = bottom;
        this.$refs.scroll.refresh();
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        });
        this.setDisc(item);
      },
      // 图片加载时执行一次
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true;
          this.$refs.scroll.refresh();
        }
      },
      // 获取轮播图数据
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider;
          }
        });
      },
      // 获取歌单
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list;
          }
        });
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import '~common/css/variable';
  .recommend {
    position: fixed;
    width: 100%;
    top: 8.8rem;
    bottom: 0;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .slider-wrapper {
        width: 100%;
        overflow: hidden;
      }
      .recommend-list {
        .list-title {
          height: 6.5rem;
          line-height: 6.5rem;
          text-align: center;
          font-size: @font-size-medium;
          color: @color-theme;
        }
        .item {
          display: flex;
          padding: 0 2rem 2rem;
          .icon {
            flex: 0 0 6rem;
            width: 6rem;
            padding-right: 2rem;
            & > img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 2rem;
            overflow: hidden;
            font-size: @font-size-medium;
            .name {
              margin-bottom: 1rem;
              color: @color-text;
            }
            .desc {
              color: @color-text-d;
            }
          }
        }
      }
      .loading-container {
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translateY(-50%);
      }
    }
  }
</style>

