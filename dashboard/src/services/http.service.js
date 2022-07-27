import axios from "axios";

const get = async (url, params = null, headers = false) => {
  return axios.get(url, { params: params });
};

const post = async (url, body = null, headers = false) => {
  return axios.post(url, body);
};

const put = async (url, body = null, headers = false) => {
  return axios.put(url, body);
};

const del = async (url, params) => {
  return axios.del(url, { params: params });
};

export { get, post, put, del };
