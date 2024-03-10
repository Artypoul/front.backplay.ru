import { apiGetFetcher } from "../../../../utils/axios";

export const GetMessages = async (chatId) => {
  try {
    const {
      messages,
    } = await apiGetFetcher(`/chats/${chatId}/messages`);

    if (messages) {
      return {
        messages,
      };
    }

    throw new Error('');
  } catch (error) {
    return {
      message: 'Empty messages',
    };
  }
};
