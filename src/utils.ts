import { BASE_URL } from "./config";
import urlJoin from "url-join";

export const getBaseUrl = (path: string): string => {
  // TODO: fix that.
  return urlJoin(BASE_URL, path);
  return `${BASE_URL}/${path}`;
};
