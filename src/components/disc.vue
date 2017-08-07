<template>
  <transition name="slide">
    <music-list :name="name" :avatar="avatar" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import MusicList from 'components/music_list'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  export default {
    components: {MusicList},
    created() {
      this._getSongList();
    },
    data() {
      return {
        songs: []
      }
    },
    methods: {
      _getSongList() {
        if(!this.disc.dissid){
          this.$router.push({
            path: '/recommend'
          });
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if(res.code === ERR_OK){
            this.songs = this._normalizeSongs(res.cdlist[0].songlist);
          }
        });
      },
      _normalizeSongs(list){
        let ret = [];
        list.forEach((item) => {
          if(item.songid && item.albummid){
            ret.push(createSong(item));
          }
        });
        return ret;
      }
    },
    computed: {
      name() {
        return this.disc.dissname;
      },
      avatar() {
        return this.disc.imgurl;
      },
      ...mapGetters(['disc'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s ease;
  }
  .slide-enter, .slide-leave-to{
    transform: translateX(100%);
  }
</style>
