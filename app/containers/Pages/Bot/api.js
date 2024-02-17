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

export const getProjectsInfo = async () => {
  const requests = [
    apiGetFetcher('/keys'),
    apiGetFetcher('/changes'),
  ];

  const [{keys}, {changes}] = await Promise.all(requests);

  return {
    keys,
    changes,
  };
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
    {steps},
    {orderFiles},
  ] = await Promise.all(requests);

  return {
    steps,
    orderFiles,
  };
};

export const SendToCheck = async (orderId) => {
  const {
    message,
  } = await apiPostFetcher(`/orders/${orderId}/accept`);

  return message;
};

export const OrderAccept = async (orderId, link) => {
  const {
    message,
  } = await apiPostFetcher(`/orders/${orderId}/files`, link);

  return message;
};

export const OrderDecline = async (orderId, comment) => {
  const {
    message,
  } = await apiPostFetcher(`/orders/${orderId}/decline`, comment);

  return message;
};
