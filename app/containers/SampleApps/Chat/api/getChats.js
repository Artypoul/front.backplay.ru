import { apiGetFetcher } from "../../../../utils/axios";

export const GetChats = async () => {
  const {
    users,
  } = await apiGetFetcher('/users');

  return users;
};
