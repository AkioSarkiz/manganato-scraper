import { BASE_URL } from "./config";
import urlJoin from "url-join";

export const getBaseUrl = (path: string): string => {
  return urlJoin(BASE_URL, path);
};