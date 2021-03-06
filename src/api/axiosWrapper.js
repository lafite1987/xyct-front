import axios from 'axios';
import { Loading, Message } from 'element-ui';
let loadingInstance = null;

let prefix = process.env.API_ROOT
// let prefix = ''

// Add a request interceptor 
axios.interceptors.request.use(function (config) {
    // alert(JSON.stringify(config));
    // if (loadingInstance) {
    //     loadingInstance.close();
    // }

    // loadingInstance = Loading.service({ target: '.content-container' });
    // Do something before request is sent     
    
    config.withCredentials = true;
    config.headers = config.headers || {};
    config.headers.Authorization = `token ${storeSession.get("token")}`;
    config.headers['X-Requested-With'] = 'XMLHttpRequest';

    return config;
}, function (error) {
    // loadingInstance.close();
    // Do something with request error 
    return Promise.reject(error);
});

// Add a response interceptor 
axios.interceptors.response.use(function (response) {
    // Do something with response data 
    // loadingInstance.close();
    //业务错误
    if (response.data.code == 500) {
        Message.error(response.data.message);
    }
    //用户如果未登录，则跳转到登录页面
    else if (response.data.code == 502) {
        window.location = "/#/login";
        //this.$router.push({ path: '/login' });
    } else {
        return response;
    }
}, function (error) {
    // Do something with response error 
    // loadingInstance.close();
    return Promise.reject(error);
});

export default axios