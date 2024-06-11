import { apiClient } from "./apiClient";

export const updateUser = async (data: any) => {
  const response = await apiClient.post("/update-user-data", data);
  return response.data;
};

export const fetchUser = async (uid: string) => {
  const response = await apiClient.get(`/fetch-user-data/${uid}`);
  return response.data;
};
