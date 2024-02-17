import produce from 'immer';

import { FILL, INIT } from '../constants/product';

const initialState = {
  product: {
    name: '',
    singer: '',
    tempo: '',
    price: '',
    price_without_bass: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const productReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case INIT:
      draft.product = state;
      break;
    case FILL:
      draft.product = action.payload;
      break;
    default:
      break;
  }
});

export default productReducer;
