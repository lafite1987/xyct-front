import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import User from './views/user/User.vue'
import UserAdd from './views/user/UserAdd.vue'
import UserUpdate from './views/user/UserUpdate.vue'

import Account from './views/account/Account.vue'
import AccountAdd from './views/account/AccountAdd.vue'
import AccountUpdate from './views/account/AccountUpdate.vue'

import Order from './views/order/Order.vue'

let routes = [{
    path: '/login',
    component: Login,
    name: '',
},
{
    path: '/404',
    component: NotFound,
    name: '',
},
{
    path: '/',
    component: Home,
    name: '',
    children: [{
        path: '/user',
        component: User,
        name: '工作看板',
        children: [
        ]
    }]
},
{
    path: '/',
    component: Home,
    name: '业务管理',
    children: [
        {
            path: '/user',
            component: User,
            name: '用户列表',
            children: [{
                path: 'add',
                component: UserAdd,
                name: 'userAdd',
                alias: '添加用户'
            },
            {
                path: ':id/update',
                component: UserUpdate,
                name: 'userUpdate',
                alias: '更新用户'
            },
            ]
        }, {
            path: '/order',
            component: Order,
            name: '订单列表',
            children: [
            ]
        }, 
    ]
}, 
{
    path: '/',
    component: Home,
    name: '系统管理',
    children: [{
            path: '/account',
            component: Account,
            name: '账户管理',
            children: [{
                path: 'add',
                component: AccountAdd,
                name: 'accountAdd',
                alias: '添加账户'
            },
            {
                path: ':id/update',
                component: AccountUpdate,
                name: 'accountUpdate',
                alias: '更新账户'
            }]
        }
    ]
}, 
{
    path: '*',
    redirect: {
        path: '/404'
    }
}
];

export default routes;