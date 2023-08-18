import axios from "axios";
import { API_URL } from "../../constants";

const client = axios.create({ baseURL: API_URL });

export const request = ({ ...options }) => {
  const jwtAuthToken = localStorage.getItem("JWT_TOKEN");
  client.defaults.headers.common.Authorization = jwtAuthToken;

  return client(options);
};
