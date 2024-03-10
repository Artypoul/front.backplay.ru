import { apiPostFetcher } from "../../../../utils/axios";

export const PayOrder = async (orderId) => {
  try {
    const {
      message,
    } = await apiPostFetcher(`/orders/${orderId}/pay`);

    return {
      message,
    };
  } catch (error) {
    return {
      message: error.message,
    };
  }
};
