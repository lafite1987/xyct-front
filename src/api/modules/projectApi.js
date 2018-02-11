import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

//项目相关接口
//获取项目列表
export const getProjectList = params => { return axios.post(`${prefix}/project/list.json`, params); };
//新建项目
export const addProject = params => { return axios.post(`${prefix}/project/add.json`, params); };
//更新项目
export const updateProject = (id, params) => { return axios.post(`${prefix}/project/${id}/update.json`, params); };
//删除项目
export const deleteProject = (id) => { return axios.get(`${prefix}/project/${id}/delete.json`); };
//获取项目详情
export const detailProject = (id) => { return axios.get(`${prefix}/project/${id}/detail.json`); };