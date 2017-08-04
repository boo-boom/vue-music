import {mapGetters} from 'vuex'

//混合：mixin 共用的方法 如果组件中有mixin中的方法时，组件中的函数会替换掉mixin中的函数
export const playListMixin = {
  /*mounted(){
    this.handlePlayList(this.playList);
  },*/
  activated(){
    this.handlePlayList(this.playList);
  },
  methods: {
    handlePlayList() {
      throw new Error('在当前component中的methods添加handlePlayList');
    }
  },
  watch: {
    playList(newVal) {
      this.handlePlayList(newVal);
    }
  },
  computed: {
    ...mapGetters(['playList'])
  }
};
