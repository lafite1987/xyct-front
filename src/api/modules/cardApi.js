import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

export const list = params => { return axios.post(`${prefix}/sys/card/list.json`, params); };
export const add = params => { return axios.post(`${prefix}/sys/card/add.json`, params); };
export const update = (id, params) => { return axios.post(`${prefix}/sys/card/${id}/update.json`, params); };
export const del = (id) => { return axios.post(`${prefix}/sys/card/${id}/del.json`); };
export const detail = (id) => { return axios.get(`${prefix}/sys/card/${id}/detail.json`); };
export const all = () => { return axios.get(`${prefix}/sys/card/all.json`); };
