import axios, { AxiosInstance } from 'axios';

export const END_POINT = process.env.REACT_APP_BACKEND_ENDPOINT;

class Adapter {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: END_POINT,
      timeout: 10000,
      withCredentials: true,
    });
  }
}
const adapter = new Adapter();

export default adapter;
