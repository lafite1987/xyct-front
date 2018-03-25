import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

export const add = (params) => { return axios.post(`${prefix}/sys/user/add.json`, params); };

export const update = (params) => { return axios.post(`${prefix}/sys/user/update.json`, params); };

export const list = (params) => { return axios.post(`${prefix}/sys/user/list.json`, params); };

export const del = (id) => { return axios.get(`${prefix}/sys/user/${id}/delete.json`); };

export const detail = (id) => { return axios.get(`${prefix}/sys/user/id/${id}/detail.json`); };