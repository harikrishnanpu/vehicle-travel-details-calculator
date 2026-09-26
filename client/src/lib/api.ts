import axios from "axios";

const serverUrl = import.meta.env.VITE_API_URL;
let baseURL = "/api";

if (import.meta.env.PROD && serverUrl) {
  baseURL = serverUrl + "/api";
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (message) {
      return message;
    }
  }

  return "Something went wrong";
}
