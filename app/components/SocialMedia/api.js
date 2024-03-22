import { apiPostFetcher, apiPutFetcher, axiosInstance } from "../../utils/axios";

export const LoadAvatar = async (userId, data) => {
  try {
    const {
      file,
    } = await apiPostFetcher(`/files`, data);

    const {
      user,
    } = await apiPutFetcher(`/users/${userId}`, {
      avatar_id: file.id,
    });

    return user;
  } catch (error) {
    return {
      message: 'Не удалось загрузить аватар',
    };
  };
};
