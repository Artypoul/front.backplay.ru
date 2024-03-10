import produce from 'immer';
import { ADD, INIT, NEXT, PLAY, PREV, REMOVE, UPDATE_MUSIC_INDEX } from '../constants/player';

const initialState = {
  music: null,
  selectedMusicIndex: 0,
  musics: [],
};

/* eslint-disable default-case, no-param-reassign */
const aboutReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case INIT:
      draft = state;
      break;
    case ADD:
      draft.musics = action.payload;
      break;
    case PLAY:
      draft.selectedMusicIndex = action.payload || draft.selectedMusicIndex;
      draft.music = draft.musics[draft.selectedMusicIndex].demo;
      console.log('1', state)
      break;
    case NEXT:
      if ((draft.musics.length - 1) > draft.selectedMusicIndex) {
        draft.selectedMusicIndex = draft.selectedMusicIndex + 1;
        draft.music = draft.musics[draft.selectedMusicIndex].demo;

        return;
      }
      
      draft.selectedMusicIndex = 0;
      draft.music = draft.musics[draft.selectedMusicIndex].demo
      break;
    case PREV:
      if (draft.selectedMusicIndex) {
        draft.selectedMusicIndex = draft.selectedMusicIndex - 1;
        draft.music = draft.musics[draft.selectedMusicIndex].demo;

        return;
      }

      draft.selectedMusicIndex = draft.musics.length - 1;
      draft.music = draft.musics[draft.selectedMusicIndex].demo
      break;
    case UPDATE_MUSIC_INDEX:
      draft.selectedMusicIndex = action.payload;
      break;
    case REMOVE:
      draft.music = null;
      break;
    default:
      break;
  }
});

export default aboutReducer;
