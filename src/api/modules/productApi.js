import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

export const list = params => { return axios.post(`${prefix}/sys/product/list.json`, params); };
export const add = params => { return axios.post(`${prefix}/sys/product/add.json`, params); };
export const update = (id, params) => { return axios.post(`${prefix}/sys/product/${id}/update.json`, params); };
export const del = (id) => { return axios.get(`${prefix}/sys/product/${id}/delete.json`); };
export const detail = (id) => { return axios.get(`${prefix}/sys/product/${id}/detail.json`); };
