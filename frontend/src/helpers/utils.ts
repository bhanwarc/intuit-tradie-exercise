import { getIdToken } from "./auth";

export const getHeader = () => {
  return {
    headers: {
      "Content-type": "application/json;charset=utf-8",
      Authorization: `${getIdToken()}`,
    },
  };
};

export const updateQueryParams = (query: any, params: any) => {
  for (const property in params) {
    query.set(property, params[property].toString());
  }
  return "?" + query.toString();
};
