import { apiPostFetcher } from "../../../../utils/axios";

export const SendMessage = async (chatId, message) => {
  const createdMessage = await apiPostFetcher(`/chats/${chatId}/messages`, {
    message,
  });

  return createdMessage;
};
