import { sendAction } from "../reducers/chatActions";

export const bindChannel = (pusher, userId, action) => {
  const channel = pusher.subscribe(`private-users.${userId}`);

  channel.bind("App\\Events\\NewMessage", (data) => {
    const message = data.message;

    if (message.sender_id !== userId) {
      action(sendAction({
        userId: message.sender_id,
        text: message.message,
      }));
    }
  });
};
