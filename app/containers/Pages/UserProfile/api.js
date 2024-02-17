import { apiGetFetcher } from "../../../utils/axios";

export const GetUserProjects = async (userID) => {
  try {
    const {
      projects,
    } = await apiGetFetcher(`/projects?author_id=${userID}`);

    return projects;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};
