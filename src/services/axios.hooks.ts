
import type { CreateAxiosDefaults } from "axios";
import axios, { AxiosError } from "axios";
import { useMemo } from "react";
import { env } from "../utils/env";

export function useAxios(overrideOptions: CreateAxiosDefaults = {}) {
  const baseURL = env.API_ENDPOINT
  return useMemo(() => {
    const instance = axios.create({
      baseURL,
      ...overrideOptions,
      headers: {
        Authorization:`Bearer `,
        ...(overrideOptions.headers ?? {}),
      }
    });
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
          return error.response?.data ?? error;
        }
        throw error;
      }
    );
    return instance;
  }, [baseURL, overrideOptions]);
}
