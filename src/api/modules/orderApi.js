import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

export const list = (params) => { return axios.post(`${prefix}/order/list.json`, params); };
