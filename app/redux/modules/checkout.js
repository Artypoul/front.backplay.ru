import produce from 'immer';

import { ADD_PROJECT, REMOVE_PROJECT } from '../constants/checkout';
import { INIT } from '../constants/reduxFormConstants';

const initialState = {
  projects: [],
};

/* eslint-disable default-case, no-param-reassign */
const aboutReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case INIT:
      draft = state;
      break;
    case ADD_PROJECT:
      draft.projects.push(action.payload);
      break;
    case REMOVE_PROJECT:
      draft.projects = [];
      break;
    default:
      break;
  }
});

export default aboutReducer;
