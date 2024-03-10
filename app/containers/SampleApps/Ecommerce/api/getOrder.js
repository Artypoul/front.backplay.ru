import { apiGetFetcher } from "../../../../utils/axios";

export const GetOrder = async (orderId) => {
  try {
    const {
      order,
    } = await apiGetFetcher(`/orders/${orderId}`);

    return {
      order,
    };
  } catch (error) {
    return {
      message: error.message,
    };
  }
};
