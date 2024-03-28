import { BASE_URL } from "./config";

export const getBaseUrl = (path: string = ""): string => {
  return `${BASE_URL}/${path}`;
};
