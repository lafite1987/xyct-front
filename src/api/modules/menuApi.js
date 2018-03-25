import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

export const getMenuList = () => { return axios.get(`${prefix}/sys/menu/list.json`); };

export const getBoardData = () => { return axios.get(`${prefix}/board/data.json`); };