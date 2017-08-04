<template>
  <scroll class="listview" :data="data" :listenScroll="listenScroll" :probeType="probeType" ref="listview" @scroll="scroll">
    <ul>
      <li class="list-group" v-for="(group, groupIndex) in data" :key="groupIndex" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="(item, index) in group.items" :key="index" @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <li class="item" v-for="(item, index) in shortcutList" :key="index" :class="{'current':currentIndex==index}"
            :data-index="index" @touchstart.stop.prevent="onShortcutTouchStart"
            @touchmove.stop.prevent="onShortcutTouchMove"
            ref="shortcutItem">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixedDom">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll';
  import Loading from 'base/loading';
  import {getData} from 'common/js/base';

  export default {
    name: 'listview',
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        currentIndex: 0,
        scrollY: 0,
        fixedHeight: 0,
        diff: 0
      }
    },
    created() {
      this.touch = {};
      this.listHeight = [];
      this.listenScroll = true;
      this.probeType = 3;
    },
    components: {Scroll, Loading},
    methods: {
      selectItem(item){
        this.$emit('select', item);
      },
      // 按下
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'data-index');
        this.touch.anchorIndex = parseInt(anchorIndex);
        let firstTouch = e.touches[0];
        this.touch.y1 = firstTouch.clientY;
        this.currentIndex = anchorIndex;
        this.touch.anchor_height = this.$refs.shortcutItem[0].clientHeight;
        this._scrollTo(anchorIndex);
      },
      // 滑动
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0];
        this.touch.y2 = firstTouch.clientY;
        //let delta = parseInt((this.touch.y2 - this.touch.y1) / this.touch.anchor_height);
        let delta = (this.touch.y2 - this.touch.y1) / this.touch.anchor_height | 0;
        let anchorIndex = delta + this.touch.anchorIndex;
        this._scrollTo(anchorIndex);
      },
      // 获取滚动距离
      scroll(pos) {
        this.scrollY = pos.y;
      },
      refresh() {
        this.$refs.listview.refresh();
      },
      // 获取每个列表的高度并添加到数组中
      _calculateHeight() {
        const list = this.$refs.listGroup;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
          height += list[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      // 滑动至指定element
      _scrollTo(index) {
        if (index < 0){
          index = 0;
          return
        }
        if(index > this.listHeight.length){
          index = this.listHeight.length - 2;
          return
        }
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 400);
      }
    },
    watch: {
      data() {
        this.$nextTick(() => {
          this._calculateHeight();
          this.fixedHeight = this.$refs.fixedDom.clientHeight;
        })
      },
      scrollY(newY) {
        const listHeight = this.listHeight;
        if (newY > 0) {
          this.currentIndex = 0;
          return
        }
        for (let i = 0; i < listHeight.length; i++) {
          let height1 = listHeight[i];
          let height2 = listHeight[i + 1];
          if (!height2 || (-newY >= height1 && -newY < height2)) {
            this.currentIndex = i;
            this.diff = height2 + newY;
            return
          }
        }
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < this.fixedHeight) ? newVal - this.fixedHeight : 0;
        this.$refs.fixedDom.style.transform = `translate3d(0,${fixedTop}px,0)`;
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1);
        });
      },
      fixedTitle() {
        if (this.scrollY > 0) return '';
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import '~common/css/variable';
  .listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: @color-background;
    .list-group {
      padding-bottom: 3rem;
      .list-group-title {
        height: 3rem;
        line-height: 3rem;
        padding-left: 2rem;
        font-size: @font-size-small;
        color: @color-text-l;
        background: @color-highlight-background;
      }
      .list-group-item {
        display: flex;
        align-items: center;
        padding: 2rem 0 0 3rem;
        .avatar {
          flex: 0 0 5rem;
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          overflow: hidden;
          & > img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .name {
          margin-left: 2rem;
          color: @color-text-l;
          font-size: @font-size-medium;
        }
      }
    }
    .list-shortcut {
      position: absolute;
      right: 0;
      top: 50%;
      z-index: 30;
      transform: translateY(-50%);
      width: 2rem;
      padding: 2rem 0;
      border-radius: 1rem;
      text-align: center;
      background: @color-background-d;
      font-family: Helvetica;
      .item {
        //font-size: 20rem;
        padding: 0.3rem;
        line-height: 1;
        color: @color-text-l;
        font-size: @font-size-small;
        &.current {
          color: @color-theme;
        }
      }
    }
    .list-fixed {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      padding-left: 2rem;
      font-size: @font-size-small;
      color: @color-text-l;
      background: @color-highlight-background;
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
