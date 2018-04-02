import axios from './axiosWrapper';


import * as account from './modules/accountApi.js'
import * as auth from './modules/authApi.js'
import * as user from './modules/userApi.js'
import * as menu from './modules/menuApi.js'
import * as validator from './modules/validatorApi.js'

import * as order from './modules/orderApi.js'
import * as product from './modules/productApi.js'
import * as card from './modules/cardApi.js'

let prefix = process.env.API_ROOT

export default {
    account,
    auth,
    user,
    menu,
    validator,
    order,
    product,
    card
}