import { apiGetFetcher } from "../../../utils/axios";

export const GetOrders = async (page = 1, perPage = 20) => {
  const {
    orders,
  } = await apiGetFetcher(`/orders?page=${page}&per_page=${perPage}`);

  return orders;
};
