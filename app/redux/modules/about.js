import produce from 'immer';
import { INIT } from '../constants/reduxFormConstants';
import { FILL_FORM } from '../constants/about';

const initialState = {
  userData: {
    first_name: '',
    last_name: '',
    address: '',
    phone: '',
    brand_name: '',
    user: null,
  }
};

/* eslint-disable default-case, no-param-reassign */
const aboutReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case INIT:
      draft = state;
      break;
    case FILL_FORM:
      draft.userData = action.payload;
      break;
    default:
      break;
  }
});

export default aboutReducer;
