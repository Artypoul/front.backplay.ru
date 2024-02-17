import { apiGetFetcher } from "../../../utils/axios";

export const GetProjectsRequest = async (page, tags) => {
  let result = '';
  Object.keys(tags).forEach((key) => {
    if (tags[key]) {
      result += `&tag_id[]=${key}`;
    }
  });
  
  const {
    projects,
    status,
  } = await apiGetFetcher(`/projects?page=${page}&per_page=20${result}`);

  if (status === 200) {
    return {
      projects: projects.data,
      total: projects.total,
      pagination: {
        current_page: projects.current_page,
        per_page: projects.per_page,
        total_pages: Math.ceil(projects.total / projects.per_page),
      },
    };
  }

  return {
    message: 'Cannot get projects',
  };
};

export const GetTags = async () => {
  const {
    tags,
    status,
  } = await apiGetFetcher('/tags');

  if (status === 200) {
    return tags;
  }

  return {
    message: 'Cannot get projects',
  };
};
