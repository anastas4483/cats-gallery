import axiosDefault from "axios";

export const axios = axiosDefault.create({
  baseURL: 'https://api.thecatapi.com/v1/images/search'
});