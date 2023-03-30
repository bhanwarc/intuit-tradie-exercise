import axios, { AxiosRequestConfig } from "axios";
import { getHeader } from "helpers/utils";
const API_URL = process.env.REACT_APP_API_URL;

export type Method = "get" | "delete" | "post" | "put" | "patch";

export const prepareQueryParams = (data: any) => {
  const query = Object.entries(data)
    .filter(([value]) => (value ? true : false))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return query ? "?" + query : "";
};

export const apiCall = (
  method: Method,
  url: string,
  options: AxiosRequestConfig = {},
) => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        method,
        url,
        ...options,
      })
      .then((res) => resolve(res.data))
      .catch((error) => {
        if (error.response) {
          return reject(error.response.data.error);
        } else if (error.request) {
          return reject("Request failed");
        } else {
          return reject(error);
        }
      });
  });
};

export const getClientProfile = (clientId: string) =>
  apiCall("get", `${API_URL}/clients/${clientId}`, getHeader());

export const updateClientProfile = (clientId: string, data: any) =>
  apiCall("post", `${API_URL}/clients/${clientId}`, { data, ...getHeader() });

export const clientJobs = (clientId: string) =>
  apiCall("get", `${API_URL}/clients/${clientId}/jobs`, getHeader());

export const clientJob = (clientId: string, jobId: string) =>
  apiCall("get", `${API_URL}/clients/${clientId}/jobs/${jobId}`, getHeader());

export const createJob = (clientId: string, jobId: string, data: any) =>
  apiCall("post", `${API_URL}/clients/${clientId}/jobs/${jobId}`, {
    data,
    ...getHeader(),
  });

export const closeJob = (clientId: string, jobId: string) =>
  apiCall("post", `${API_URL}/clients/${clientId}/jobs/${jobId}/close`, getHeader());

//
export const getTalentProfile = (talentId: string) =>
  apiCall("get", `${API_URL}/talents/${talentId}`, getHeader());

export const updateTalentProfile = (talentId: string, data: any) =>
  apiCall("post", `${API_URL}/talents/${talentId}`, { data, ...getHeader() });

export const jobs = () => apiCall("get", `${API_URL}/jobs`, getHeader());

export const job = (jobId: string) =>
  apiCall("get", `${API_URL}/jobs/${jobId}`, getHeader());

export const placeBid = (jobId: string, data: any) =>
  apiCall("post", `${API_URL}/jobs/${jobId}/proposal`, { data, ...getHeader() });

export const talentBids = () => apiCall("get", `${API_URL}/talents/bids`, getHeader());

export const getJobBids = (clientId: string, jobId: string) =>
  apiCall("get", `${API_URL}/clients/${clientId}/jobs/${jobId}/bids`, getHeader());
