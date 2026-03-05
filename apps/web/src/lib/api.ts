import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const api = axios.create({ baseURL });

export function setAuthToken(token: string | null) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: { userId: string; email: string; role: string; clientId: string | null };
};
