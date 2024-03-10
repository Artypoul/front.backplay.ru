import { apiGetFetcher } from "../../../../utils/axios";

export const GetChats = async (chatId) => {
  const requests = [
    apiGetFetcher('/users'),
    apiGetFetcher('/chats'),
  ];

  const [
    { users },
    { chats },
  ] = await Promise.all(requests);

  return {
    users,
    chats,
  };
};
