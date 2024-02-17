import { INIT, LOG_OUT } from "../constants/user";

export const userInit = (data) => {
  return {
    type: INIT,
    payload: data,
  };
}

export const userClear = () => {
  return {
    type: LOG_OUT,
    payload: null,
  };
}
