import {playMode} from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  currentIndex: 0,
  mode: playMode.sequence,
  disc: {},
  topList: {}
};

export default state;
