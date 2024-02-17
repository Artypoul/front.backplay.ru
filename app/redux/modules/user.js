import produce from 'immer';

import { INIT, LOG_OUT } from '../constants/user';

const initialState = {
  user: null,
  isAdmin: false,
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case INIT:
      draft.user = action.payload;
      draft.isAdmin = action.payload.role.id !== 3;
      break;
    case LOG_OUT:
      draft.user = null;
      break;
    default:
      break;
  }
});

export default userReducer;
