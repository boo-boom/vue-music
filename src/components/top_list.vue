<template>
  <transition name="slide">
    <music-list :name="name" :avatar="avatar" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import MusicList from 'components/music_list'
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  export default {
    components: {MusicList},
    created() {
      this._getMusicList();
    },
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    methods: {
      _getMusicList(){
        if(!this.topList.id) {
          this.$router.push({
            path: '/rank'
          });
          return
        }
        getMusicList(this.topList.id).then((res) => {
          if(res.code === ERR_OK){
            this.songs = this._normalizeSongs(res.songlist);
          }
        })
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach((item) => {
          const musicData = item.data;
          if(musicData.songid && musicData.albummid){
            ret.push(createSong(musicData));
          }
        });
        return ret;
      }
    },
    computed: {
      name() {
        return this.topList.topTitle;
      },
      avatar() {
        if(this.songs.length){
          return this.songs[0].image;
        }
        return this.topList.picUrl;
      },
      ...mapGetters(['topList'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s ease;
  }
  .slide-enter, .slide-leave-active{
    transform: translateX(100%);
  }
</style>
