import axios from './axiosWrapper';


import * as account from './modules/accountApi.js'
// import * as auth from './modules/authApi.js'
import * as db from './modules/dbApi.js'
import * as menu from './modules/menuApi.js'
import * as project from './modules/projectApi.js'
import * as validator from './modules/validatorApi.js'

let prefix = process.env.API_ROOT

export default {
    account,
    // auth,
    db,
    menu,
    project,
    validator,
}