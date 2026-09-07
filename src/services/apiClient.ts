import axios from "axios";

/**
 * Configurable base URL. Point VITE_API_BASE_URL at the FastAPI service
 * (e.g. http://localhost:8000/api) and flip USE_MOCK to false to go live.
 */
export const API_BASE_URL =
  (import.meta.env["VITE_API_BASE_URL"] as string | undefined) ?? "http://localhost:8000/api";

export const USE_MOCK = true;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("learnhub.token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Resolves mock data after a small delay so loading states are exercised. */
export function mock<T>(data: T, delay = 450): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

/**
 * Single switch point: while USE_MOCK is true every call returns mock data;
 * once the backend exists, the GET path below takes over unchanged.
 */
export async function request<T>(path: string, fallback: T, delay = 450): Promise<T> {
  if (USE_MOCK) return mock(fallback, delay);
  const { data } = await apiClient.get<T>(path);
  return data;
}
