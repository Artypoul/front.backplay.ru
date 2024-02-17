import { apiPostFetcher } from "../../utils/axios";

export const LogOutRequest = async () => {
  const {
    message,
    status,
  } = await apiPostFetcher('/user/logout');

  if (status === 200) {
    return true;
  }
};
