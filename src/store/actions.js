import * as types from './mutations_types'
import {playMode} from 'common/js/config'
import {shuffle, findIndex} from 'common/js/base'

const actions = {
  selectPlay({commit, state}, {list, index}) {
    commit(types.SET_PLAYING_STATE, true);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_SEQUENCE_LIST, list);
    if (state.mode === playMode.random) {
      let randomList = shuffle(state.sequenceList);
      commit(types.SET_PLAYLIST, randomList);
      index = findIndex(randomList, list[index]);
    } else {
      commit(types.SET_PLAYLIST, list);
    }
    commit(types.SET_CURRENT_INDEX, index);
  },
  randomPlay({commit, state}, {list}){
    commit(types.SET_PLAYING_STATE, true);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_SEQUENCE_LIST, list);
    commit(types.SET_PLAYER_MODE, playMode.random);
    commit(types.SET_PLAYLIST, shuffle(list));
    commit(types.SET_CURRENT_INDEX, 0);
  }
};

export default actions;
