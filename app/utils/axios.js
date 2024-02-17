import axios from 'axios'

import { BASE_URL } from './constants'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(resolve => {
  const token = localStorage.getItem('token');
  resolve.headers['Authorization'] = `Bearer ${token}`;

  return resolve;
}, reject => reject);

export const apiPostFetcher = async (route, body, config = {}) => {
  try {
    const {
      data,
      status,
    } = await axiosInstance.post(route, body, config);

    if (data) {
      data.status = status;

      return data;
    }

    throw new Error('Cannot post data');
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export const apiGetFetcher = async (route, config = {}) => {
  try {
    const {
      data,
      status,
    } = await axiosInstance.get(route, config);

    if (data) {
      data.status = status;

      return data;
    }

    throw new Error('Cannot get data');
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export const apiPutFetcher = async (route, body, config = {}) => {
  try {
    const {
      data,
      status,
    } = await axiosInstance.put(route, body, config);

    if (data) {
      data.status = status;

      return data;
    }

    throw new Error('Cannot update data');
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export const apiDeleteFetcher = async (route, config = {}) => {
  try {
    const {
      data,
      status,
    } = await axiosInstance.delete(route, config);

    if (data) {
      data.status = status;
      
      return data;
    }

    throw new Error('Cannot delete data');
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

