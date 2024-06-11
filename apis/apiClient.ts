import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Check if the error is a 500 error with a specific message
    if (
      (error.response &&
        error.response.status === 500 &&
        error.response.data &&
        error.response.data.error === "Failed to authenticate token") ||
      error.response.data.error === "No token provided" ||
      error.response.data.error === "User not found"
    ) {
      // Redirect to /login
      window.location.href = "/login";
    }
    // Do something with response error
    return Promise.reject(error);
  }
);
