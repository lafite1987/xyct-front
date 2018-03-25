import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

export const list = params => { return axios.post(`${prefix}/sys/account/list.json`, params); };
export const addAccount = params => { return axios.post(`${prefix}/sys/account/add.json`, params); };
export const update = (id, params) => { return axios.post(`${prefix}/sys/account/${id}/update.json`, params); };
export const deleteAccount = (id) => { return axios.get(`${prefix}/sys/account/${id}/delete.json`); };
export const getAccountInfo = () => { return axios.get(`${prefix}/sys/user/getUserInfo.json`); };
export const detail = (id) => { return axios.get(`${prefix}/sys/account/${id}/detail.json`); };