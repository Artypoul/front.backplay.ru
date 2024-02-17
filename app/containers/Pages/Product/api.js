import { apiGetFetcher, apiPostFetcher, apiPutFetcher, axiosInstance } from "../../../utils/axios";

export const GetProjectRequest = async (projectID, isCreate) => {
  const requests = [
    apiGetFetcher('/tags'),
    apiGetFetcher('/keys'),
    apiGetFetcher('/changes'),
  ];

  if (!isCreate) {
    requests.push(apiGetFetcher(`/projects/${projectID}`));
    requests.push(apiGetFetcher(`/projects/${projectID}/variants`));
  }

  const [
    tagsResponse,
    keysResponse,
    changesResponse,
    projectResponse,
    projectVariantsResponse,
  ] = await Promise.all(requests);

  return {
    project: projectResponse && projectResponse.project,
    tags: tagsResponse.tags,
    variants: projectVariantsResponse ? projectVariantsResponse.variants : [],
    keys: keysResponse.keys,
    changes: changesResponse.changes,
  };
};

export const CreateProjectRequest = async (values) => {
  const {
    preview,
    demo,
    name,
    singer,
    price,
    price_without_bass,
    tags,
    variants,
  } = values;

  const previewFormData = new FormData();
  previewFormData.append('file', preview.file);
  previewFormData.append('file_type_id', 2);

  const demoFormData = new FormData();
  demoFormData.append('file', demo.file);
  demoFormData.append('file_type_id', 3);

  const [previewFileResponse, demoFileResponse] = await Promise.all([
    apiPostFetcher('/files', previewFormData),
    apiPostFetcher('/files', demoFormData),
  ]);

  const projectData = {
    preview_id: previewFileResponse.file.id,
    name,
    singer,
    demo_id: demoFileResponse.file.id,
    tempo: 130,
    price,
    price_without_bass,
    tags,
  };

  const {
    project,
    message,
  } = await apiPostFetcher('/projects', projectData);

  if (project) {

    variants.forEach((variant) => {
      apiPostFetcher(`/projects/${project.id}/variants`, variant);
    });

    return project;
  }

  return {
    message,
  };
};

export const UpdateProjectRequest = async (values) => {
  const {
    preview,
    demo,
    name,
    singer,
    price,
    price_without_bass,
    tags,
    variants,
    projectID,
  } = values;

  const fileRequests = [];

  if (preview) {
    console.log('preview, preview.file', preview, preview.file)
    const previewFormData = new FormData();
    previewFormData.append('file', preview.file);
    previewFormData.append('file_type_id', 2);

    fileRequests.push(apiPostFetcher(`/files/${preview.id}`, previewFormData));
  }

  if (demo) {
    const demoFormData = new FormData();
    demoFormData.append('file', demo.file);
    demoFormData.append('file_type_id', 3);

    fileRequests.push(apiPostFetcher(`/files/${demo.id}`, demoFormData));
  }

  const files = await Promise.all(fileRequests);

  const projectData = {
    name,
    singer,
    tempo: 130,
    price,
    price_without_bass,
    tags,
  };

  if (files.length) {
    if (preview && !demo) {
      projectData.preview_id = files[0].file.id;
    } else if (demo && !preview) {
      projectData.demo_id = files[0].file.id;
    } else {
      projectData.preview_id = files[0].file.id;
      projectData.demo_id = files[1].file.id;
    }
  }

  const {
    project,
    message,
  } = await apiPutFetcher(`/projects/${projectID}`, projectData);

  if (project) {
    variants.forEach((variant) => {
      if (variant.id) {
        apiPutFetcher(`/projects/${project.id}/variants/${variant.id}`, variant);
      } else {
        apiPostFetcher(`/projects/${project.id}/variants`, variant);
      }
    });

    return project;
  }

  return {
    message,
  };
};
