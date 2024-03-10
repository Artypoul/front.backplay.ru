import { apiPostFetcher } from "../../../../utils/axios";

export const CreateChat = async (values) => {
  const {
    chat,
  } = await apiPostFetcher(`/chats`, values);
  
  return chat;
};
