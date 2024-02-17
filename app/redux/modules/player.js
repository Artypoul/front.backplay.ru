import produce from 'immer';
import { ADD, INIT, REMOVE } from '../constants/player';

const initialState = {
  music: null,
};

/* eslint-disable default-case, no-param-reassign */
const aboutReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case INIT:
      draft = state;
      break;
    case ADD:
      draft.music = action.payload;
      break;
    case REMOVE:
      draft.music = null;
      break;
    default:
      break;
  }
});

export default aboutReducer;
