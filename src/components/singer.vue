<template>
  <div class="singer">
    <list-view :data='singers' @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import {ERR_OK} from 'api/config';
  import ListView from 'base/listview';
  import Singer from 'assets/js/singer';
  import {getSingerList} from 'api/singer';

  export default {
    name: 'singer',
    components: {ListView},
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList();
    },
    methods: {
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        });
        this.set_singer(singer);
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list);
          }
        });
      },
      _normalizeSinger(list) {
        const HOT_TITLE = '热门';
        const HOT_LEN = 10;
        let map = {
          hot: {
            title: HOT_TITLE,
            items: []
          }
        };
        list.forEach(function (item, index) {
          if (index < HOT_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name,
            }));
          }
          const key = item.Findex;
          // 没有map[key]时创建，for a , b ...
          // 如map.a不存在时创建一个对象
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          // 如map.a不存在时会执行上面的判断创建对象后再添加属性
          // 如map.a存在时会直接给其添加属性
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
          }));
        });

        // 排序
        let hot = [];
        let ret = [];
        for (let key in map) {
          let val = map[key];
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val);
          } else if (val.title === HOT_TITLE) {
            hot.push(val);
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });
        return hot.concat(ret);
      },
      ...mapMutations(['set_singer'])
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .singer {
    position: fixed;
    top: 8.8rem;
    bottom: 0;
    width: 100%;
  }
</style>

