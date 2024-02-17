import { axiosInstance } from "../../../utils/axios";

export const LoginRequest = async (values) => {
  const {
    email,
    password,
  } = values;

  if (!email || !password) {
    return {
      message: 'Invalid data',
    };
  }

  const {
    data,
    status,
  } = await axiosInstance.post('/login', {
    email,
    password,
  });

  if (status === 200) {
    const token = data.token;
    
    localStorage.setItem('token', token.access_token)

    return {
      user: token.user,
      message: 'Login is successfull',
    };
  }

  return {
    user: null,
    message: 'Cannot login',
  };
};

export const SendPasswordRequest = async (email) => {
  const {
    data,
    status,
  } = await axiosInstance.post('/send_password', {
    email,
  });

  if (status === 200) {
    return {
      message: data.message,
      isSuccess: true,
    };
  }

  return {
    message: 'Cannot send password',
  };
};
