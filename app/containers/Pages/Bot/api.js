import { apiGetFetcher, apiPostFetcher } from "../../../utils/axios";

export const GetOrderSteps = async (orderType = 1) => {
  const {
    steps,
  } = await apiGetFetcher(`/steps?order_type_id=${orderType}`);

  return steps;
};

export const MakeOrder = async (values) => {
  const {
    order,
  } = await apiPostFetcher(`/orders`, values);

  return order;
};

export const getProjectsInfo = async (projectId) => {
  const requests = [
    apiGetFetcher('/keys'),
    apiGetFetcher('/changes'),
  ];

  if (projectId) {
    requests.push(...[
      apiGetFetcher(`/projects/${projectId}`),
      apiGetFetcher(`/projects/${projectId}/variants`),
    ]);
  }

  const [{ keys }, { changes }, ...rest] = await Promise.all(requests);

  const responseData = {
    keys,
    changes,
  };

  if (projectId) {
    const [
      { project },
      { variants },
    ] = rest;

    responseData.project = project;
    responseData.variants = variants;
  }

  return responseData;
};

export const LoadFile = async (demo) => {
  const formData = new FormData();

  formData.append('file', demo);
  formData.append('file_type_id', 3);

  const {
    file,
  } = await apiPostFetcher('/files', formData);

  return file;
};

export const GetHistory = async (orderId) => {
  const requests = [
    apiGetFetcher(`/orders/${orderId}/steps`),
    apiGetFetcher(`/orders/${orderId}/files`),
  ];

  const [
    { steps },
    { orderFiles },
  ] = await Promise.all(requests);

  return {
    steps,
    orderFiles,
  };
};

export const SendToCheck = async (orderId, values) => {
  const {
    orderFile,
  } = await apiPostFetcher(`/orders/${orderId}/files`, values);

  return orderFile;
};

export const OrderAccept = async (orderId) => {
  const {
    orderFile,
  } = await apiPostFetcher(`/orders/${orderId}/accept`);

  return orderFile;
};

export const OrderDecline = async (orderId, comment) => {
  const {
    orderFile,
  } = await apiPostFetcher(`/orders/${orderId}/decline`, comment);

  return orderFile;
};
