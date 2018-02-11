import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import Project from './views/project/Project.vue'
import ProjectAdd from './views/project/ProjectAdd.vue'
import ProjectUpdate from './views/project/ProjectUpdate.vue'

import Db from './views/db/Db.vue'
import DbAdd from './views/db/DbAdd.vue'
import DbUpdate from './views/db/DbUpdate.vue'

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
        path: '/project',
        component: Project,
        name: '工作看板',
        children: [{
            path: 'add',
            component: ProjectAdd,
            name: 'projectAdd',
            alias: '新建项目'
        },
        {
            path: ':id/update',
            component: ProjectUpdate,
            name: 'projectUpdate',
            alias: '更新项目'
        },
        ]
    }]
},
{
    path: '/',
    component: Home,
    name: '订单管理',
    children: [
        {
            path: '/db',
            component: Db,
            name: '订单列表',
            children: [{
                path: 'add',
                component: DbAdd,
                name: 'dbAdd',
                alias: '新建数据库'
            },
            {
                path: ':id/update',
                component: DbUpdate,
                name: 'dbUpdate',
                alias: '更新数据库'
            },
            ]
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