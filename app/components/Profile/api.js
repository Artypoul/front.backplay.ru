import { apiPutFetcher } from "../../utils/axios";

export const UpdateUserHandler = async (userID, values) => {
  const data = await apiPutFetcher(`/users/${userID}`, values);
  return data;
};
