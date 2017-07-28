<template>
  <transition name="slide">
    <music-list :songs="songs" :name="name" :avatar="avatar"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {ERR_OK} from 'api/config';
  import {createSong} from 'common/js/song';
  import {getSingerDetail} from 'api/singer';
  import MusicList from 'components/music_list';

  export default {
    name: 'singerDetail',
    data() {
      return {
        songs: []
      }
    },
    components: {MusicList},
    created() {
      this._getDetail();
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer');
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSong(res.data.list);
          }
        });
      },
      _normalizeSong(list) {
        let ret = [];
        list.forEach((item, index) => {
          let musicData = item.musicData;
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData));
          }
        });
        return ret;
      }
    },
    computed: {
      name(){
        return this.singer.name;
      },
      avatar(){
        return this.singer.avatar;
      },
      ...mapGetters(['singer'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all 0.2s linear;
  }
  .slide-enter, .slide-leave-active {
    transform: translate3d(100%, 0, 0);
  }
</style>
