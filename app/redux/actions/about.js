import { FILL_FORM } from "../constants/about";

export const aboutInit = (data) => ({
  type: FILL_FORM,
  payload: data,
});
