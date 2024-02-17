import { FILL } from "../constants/product";

export const fillProduct = (data) => ({
  type: FILL,
  payload: data,
});
