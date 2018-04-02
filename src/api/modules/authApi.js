import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

export const login = (params) => { return axios.post(`${prefix}/login.json`, params); };