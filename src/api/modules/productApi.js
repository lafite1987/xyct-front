import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

//获取账户列表
export const list = params => { return axios.post(`${prefix}/product/list.json`, params); };
//新建账户
export const add = params => { return axios.post(`${prefix}/product/add.json`, params); };
//更新账户
export const update = (id, params) => { return axios.post(`${prefix}/product/${id}/update.json`, params); };
//删除账户
export const del = (id) => { return axios.get(`${prefix}/product/${id}/delete.json`); };
//获取用户详情
export const detail = (id) => { return axios.get(`${prefix}/product/${id}/detail.json`); };
