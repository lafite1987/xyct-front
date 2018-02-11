import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

export const addDb = (params) => { return axios.post(`${prefix}/db/add.json`, params); };

export const updateDb = (params) => { return axios.post(`${prefix}/db/update.json`, params); };

export const getDbList = (params) => { return axios.post(`${prefix}/db/list.json`, params); };

export const deleteDb = (id) => { return axios.get(`${prefix}/db/${id}/delete.json`); };

export const getDbConfig = () => { return axios.get(`${prefix}/db/getConfig.json`); };

export const detailDb = (id) => { return axios.get(`${prefix}/db/id/${id}/detail.json`); };