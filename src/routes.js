import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import Board from './views/board/Board.vue'

import User from './views/user/User.vue'
import UserAdd from './views/user/UserAdd.vue'
import UserUpdate from './views/user/UserUpdate.vue'

import Account from './views/account/Account.vue'
import AccountAdd from './views/account/AccountAdd.vue'
import AccountUpdate from './views/account/AccountUpdate.vue'

import Product from './views/product/Product.vue'
import ProductAdd from './views/product/ProductAdd.vue'
import ProductUpdate from './views/product/ProductUpdate.vue'

import Card from './views/card/Card.vue'
import CardAdd from './views/card/CardAdd.vue'
import CardUpdate from './views/card/CardUpdate.vue'

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
    redirect: '/board',
    name: '工作看板',
    children: [{
        path: '/board',
        component: Board,
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
        }, {
            path: '/product',
            component: Product,
            name: '商品列表',
            children: [{
                path: 'add',
                component: ProductAdd,
                name: 'productAdd',
                alias: '添加商品'
            },
            {
                path: ':id/update',
                component: ProductUpdate,
                name: 'productUpdate',
                alias: '更新商品'
            }]
        }, {
            path: '/card',
            component: Card,
            name: '卡券列表',
            children: [{
                path: 'add',
                component: CardAdd,
                name: 'cardAdd',
                alias: '添加卡券'
            },
            {
                path: ':id/update',
                component: CardUpdate,
                name: 'cardUpdate',
                alias: '更新卡券'
            }]
        }
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