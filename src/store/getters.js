const getters = {
  singer: state => state.singer,
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  playList: state => state.playList,
  sequenceList: state => state.sequenceList,
  currentIndex: state => state.currentIndex,
  currentSong: (state) => {
    return state.playList[state.currentIndex] || {};
  },
  mode: state => state.mode,
  disc: state => state.disc,
  topList: state => state.topList,
};

export default getters;
