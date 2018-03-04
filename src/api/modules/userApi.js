import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

export const add = (params) => { return axios.post(`${prefix}/user/add.json`, params); };

export const update = (params) => { return axios.post(`${prefix}/user/update.json`, params); };

export const list = (params) => { return axios.post(`${prefix}/user/list.json`, params); };

export const del = (id) => { return axios.get(`${prefix}/user/${id}/delete.json`); };

export const detail = (id) => { return axios.get(`${prefix}/user/id/${id}/detail.json`); };