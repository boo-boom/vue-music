import * as types from './mutations_types'

const mutations = {
  [types.SET_SINGER](state, singer){
    state.singer = singer;
  },
  [types.SET_PLAYING_STATE](state, flag){
    state.playing = flag;
  },
  [types.SET_FULL_SCREEN](state, flag){
    state.fullScreen = flag;
  },
  [types.SET_PLAYLIST](state, list){
    state.playList = list;
  },
  [types.SET_SEQUENCE_LIST](state, list){
    state.sequenceList = list;
  },
  [types.SET_CURRENT_INDEX](state, index){
    state.currentIndex = index;
  },
  [types.SET_PLAYER_MODE](state, mode){
    state.mode = mode;
  }
};

export default mutations;
