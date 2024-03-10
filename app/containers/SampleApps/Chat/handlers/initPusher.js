import Pusher from 'pusher-js';

import { BASE_URL } from '../../../../utils/constants';

export const initPusher = (key = '8522091b4fa63063c0ac') => {
  Pusher.logToConsole = true;
  
  const pusher = new Pusher(key, {
    cluster: 'eu',
    encrypted: false,
    authEndpoint: `${BASE_URL}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  });

  return pusher;
};
