const getters = {
  singer: state => state.singer,
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  playListL: state => state.playList,
  sequenceList: state => state.sequenceList,
  currentIndex: state => state.currentIndex,
  currentSong: (state) => {
    return state.playList[state.currentIndex] || {};
  }
};

export default getters;
