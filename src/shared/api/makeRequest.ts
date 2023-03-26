import axios from "axios";
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const makeRequest = <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> => {
  return axios({
    ...config,
    url: `${BASE_URL}${config.url}`,
    headers: {
      ...config.headers,
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};