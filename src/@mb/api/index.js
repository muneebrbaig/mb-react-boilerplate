import axios from "./Api";
import { utils } from "@mb";

const HTTP_REDIRECT_STATUS = 300;

const get = async (url, query) => {
  return new Promise((resolve, reject) => {
    try {
      const promise = utils.isEmpty(query)
        ? axios.get(url)
        : axios.get(url, {
            params: query,
          });

      promise
        .then((response) => {
          if (response.data || response.status < HTTP_REDIRECT_STATUS) {
            resolve(response.data);
          } else {
            reject(response.data.meta);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getPagedList = async (url, query) =>
  new Promise((resolve, reject) => {
    try {
      axios
        .get(url, {
          params: query,
        })
        .then((response) => {
          if (response.data) {
            resolve({
              pageInfo: JSON.parse(response.headers["x-pagination"] || {}),
              data: response.data,
            });
          } else {
            reject(response.data.meta);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
const post = async (url, entity) =>
  new Promise((resolve, reject) => {
    try {
      axios
        .post(url, entity)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.meta);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

const postToFileUpload = async (formData) =>
  new Promise((resolve, reject) => {
    try {
      console.log(formData);
      axios
        .post(`api/file/upload`, formData, {
          // receive two    parameter endpoint url ,form data
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            resolve(response.data);
          } else {
            reject(response.data.meta);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

const postFormData = async (url, formData) =>
  new Promise((resolve, reject) => {
    try {
      axios
        .post(`${url}`, formData, {
          // receive two    parameter endpoint url ,form data
        })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.meta);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const api = {
  axios,
  get,
  getPagedList,
  post,
  postFormData,
  postToFileUpload,
};
