import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
let _Users = Users;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let { username, password } = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let { name } = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let { page, name } = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });


    mock.onGet('/sys/getUserInfo.json').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            "userId": "14",
            "userName": "王同欢"
          }]);
        }, 500);
      });
    });

    mock.onPost('/validator/rules/list.json').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, { "retcode": 0, "data": "" }]);
        }, 500);
      });
    });

    mock.onGet(/\/project\/\d+\/detail\.json/).reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, { "retcode": 0, "data": { "id": 1, "systemCode": "xyct", "projectName": "应用市场", "projectCode": "1", "projectDesc": "应用市场相关项目1", "createTime": 1505370760000, "updateTime": 1506414989000 } }]);
        }, 500);
      });
    });




    mock.onGet('/sys/menu/list.json').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            "retcode": 0,
            "data": [{
              "id": 12,
              "systemCode": "xyct",
              "permName": "项目管理",
              "parentPermId": 0,
              "permCode": "project:manage",
              "permType": "MENU",
              "permUrl": "/project",
              "iconClass": "fa fa-bar-chart",
              "permDesc": "权限管理页面（列表）",
              "permOrder": 11,
              "permStatus": "ENABLE",
              "createTime": 1507711653000,
              "updateTime": 1507865598000
            }, {
              "id": 13,
              "systemCode": "xyct",
              "permName": "库表管理",
              "parentPermId": 0,
              "permCode": "hive:db&table:manage",
              "permType": "MENU",
              "permUrl": "/",
              "iconClass": "fa fa-bar-chart",
              "permDesc": "库表管理",
              "permOrder": 20,
              "permStatus": "ENABLE",
              "createTime": 1507713015000,
              "updateTime": 1507728219000
            }, {
              "id": 14,
              "systemCode": "xyct",
              "permName": "HIVE库管理",
              "parentPermId": 13,
              "permCode": "hive:db:manage",
              "permType": "MENU",
              "permUrl": "/hivedb",
              "iconClass": "fa fa-bar-chart",
              "permDesc": "hive库管理",
              "permOrder": 21,
              "permStatus": "ENABLE",
              "createTime": 1507713137000,
              "updateTime": 1507728485000
            }, {
              "id": 15,
              "systemCode": "xyct",
              "permName": "HIVE表管理",
              "parentPermId": 13,
              "permCode": "hive:table:manage",
              "permType": "MENU",
              "permUrl": "/hivetable",
              "iconClass": "",
              "permDesc": "hive表管理",
              "permOrder": 22,
              "permStatus": "ENABLE",
              "createTime": 1507713216000,
              "updateTime": 1507728490000
            }, {
              "id": 16,
              "systemCode": "xyct",
              "permName": "变更记录",
              "parentPermId": 13,
              "permCode": "hive:updatelog:manage",
              "permType": "MENU",
              "permUrl": "/hiveupdatelog",
              "iconClass": "",
              "permDesc": "hive表变更记录",
              "permOrder": 23,
              "permStatus": "ENABLE",
              "createTime": 1507713282000,
              "updateTime": 1507728495000
            }, {
              "id": 17,
              "systemCode": "xyct",
              "permName": "权限管理",
              "parentPermId": 0,
              "permCode": "permission:manage",
              "permType": "MENU",
              "permUrl": "/",
              "iconClass": "fa fa-bar-chart",
              "permDesc": "权限管理一级菜单",
              "permOrder": 40,
              "permStatus": "ENABLE",
              "createTime": 1507713361000,
              "updateTime": 1507728288000
            }, {
              "id": 18,
              "systemCode": "xyct",
              "permName": "动作权限",
              "parentPermId": 17,
              "permCode": "actionPermission:manage",
              "permType": "MENU",
              "permUrl": "/permission",
              "iconClass": "",
              "permDesc": "动作权限管理",
              "permOrder": 41,
              "permStatus": "ENABLE",
              "createTime": 1507713469000,
              "updateTime": 1507728515000
            }, {
              "id": 19,
              "systemCode": "xyct",
              "permName": "角色管理",
              "parentPermId": 17,
              "permCode": "role:manage",
              "permType": "MENU",
              "permUrl": "/role",
              "iconClass": "",
              "permDesc": "角色管理菜单",
              "permOrder": 42,
              "permStatus": "ENABLE",
              "createTime": 1507714058000,
              "updateTime": 1507728522000
            }, {
              "id": 20,
              "systemCode": "xyct",
              "permName": "权限申请",
              "parentPermId": 17,
              "permCode": "permission:apply",
              "permType": "MENU",
              "permUrl": "/apply",
              "iconClass": "",
              "permDesc": "权限申请",
              "permOrder": 43,
              "permStatus": "ENABLE",
              "createTime": 1507714636000,
              "updateTime": 1507728527000
            }, {
              "id": 21,
              "systemCode": "xyct",
              "permName": "权限审核",
              "parentPermId": 17,
              "permCode": "permission:audit",
              "permType": "MENU",
              "permUrl": "/audit",
              "iconClass": "",
              "permDesc": "权限审核",
              "permOrder": 44,
              "permStatus": "ENABLE",
              "createTime": 1507714712000,
              "updateTime": 1507728531000
            }, {
              "id": 23,
              "systemCode": "xyct",
              "permName": "账户管理",
              "parentPermId": 0,
              "permCode": "account:manage",
              "permType": "MENU",
              "permUrl": "/account",
              "iconClass": "",
              "permDesc": "账户管理",
              "permOrder": 51,
              "permStatus": "ENABLE",
              "createTime": 1507715039000,
              "updateTime": 1507866044000
            }, {
              "id": 25,
              "systemCode": "xyct",
              "permName": "系统管理",
              "parentPermId": 0,
              "permCode": "system:manage",
              "permType": "MENU",
              "permUrl": "/system",
              "iconClass": "fa fa-bar-chart",
              "permDesc": "系统管理",
              "permOrder": 31,
              "permStatus": "ENABLE",
              "createTime": 1507715151000,
              "updateTime": 1507865977000
            }, {
              "id": 49,
              "systemCode": "xyct",
              "permName": "工作流与调度",
              "parentPermId": 0,
              "permCode": "workflow&job:manage",
              "permType": "MENU",
              "permUrl": "/",
              "iconClass": "",
              "permDesc": "工作流与调度",
              "permOrder": 61,
              "permStatus": "ENABLE",
              "createTime": 1508932103000,
              "updateTime": 1509591669000
            }, {
              "id": 50,
              "systemCode": "xyct",
              "permName": "数据库管理",
              "parentPermId": 49,
              "permCode": "database:manage",
              "permType": "MENU",
              "permUrl": "/db",
              "iconClass": "",
              "permDesc": "数据库管理",
              "permOrder": 62,
              "permStatus": "ENABLE",
              "createTime": 1508932152000,
              "updateTime": 1508934363000
            }, {
              "id": 51,
              "systemCode": "xyct",
              "permName": "任务管理",
              "parentPermId": 49,
              "permCode": "task:manage",
              "permType": "MENU",
              "permUrl": "/task",
              "iconClass": "",
              "permDesc": "任务管理",
              "permOrder": 63,
              "permStatus": "ENABLE",
              "createTime": 1508932687000,
              "updateTime": 1508932687000
            }, {
              "id": 52,
              "systemCode": "xyct",
              "permName": "执行管理",
              "parentPermId": 49,
              "permCode": "execution:manage",
              "permType": "MENU",
              "permUrl": "/execution",
              "iconClass": "",
              "permDesc": "",
              "permOrder": 64,
              "permStatus": "ENABLE",
              "createTime": 1508932745000,
              "updateTime": 1508932745000
            }, {
              "id": 53,
              "systemCode": "xyct",
              "permName": "交互查询",
              "parentPermId": 13,
              "permCode": "hive:real-time:query",
              "permType": "MENU",
              "permUrl": "/hivequery",
              "iconClass": "",
              "permDesc": "",
              "permOrder": 1,
              "permStatus": "ENABLE",
              "createTime": 1509108912000,
              "updateTime": 1509109004000
            }, {
              "id": 54,
              "systemCode": "xyct",
              "permName": "申请信息",
              "parentPermId": 17,
              "permCode": "apply:info",
              "permType": "MENU",
              "permUrl": "/applyInfo",
              "iconClass": "primary",
              "permDesc": "",
              "permOrder": 5,
              "permStatus": "ENABLE",
              "createTime": 1511255823000,
              "updateTime": 1511257162000
            }
            ]
          }
          ]);
        }, 500);
      });
    });

    mock.onPost('/project/list.json').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            "retcode": 0,
            "data": {
              "page": {
                "currentPage": 1,
                "pageSize": 15,
                "totalNum": 44
              },
              "list": [{
                "id": 1,
                "systemCode": "xyct",
                "projectName": "应用市场",
                "projectCode": "1",
                "projectDesc": "应用市场相关项目1",
                "createTime": 1505370760000,
                "updateTime": 1506414989000
              }, {
                "id": 2,
                "systemCode": "xyct",
                "projectName": "广告系统",
                "projectCode": "2",
                "projectDesc": "广告系统相关项目",
                "createTime": 1505371450000,
                "updateTime": 1505445819000
              }, {
                "id": 3,
                "systemCode": "xyct",
                "projectName": "浏览器",
                "projectCode": "3",
                "projectDesc": "浏览器相关项目",
                "createTime": 1505371461000,
                "updateTime": 1505445819000
              }, {
                "id": 4,
                "systemCode": "xyct",
                "projectName": "日志系统",
                "projectCode": "4",
                "projectDesc": "细致系统相关项目",
                "createTime": 1505371473000,
                "updateTime": 1505445819000
              }, {
                "id": 5,
                "systemCode": "xyct",
                "projectName": "配置中心",
                "projectCode": "5",
                "projectDesc": "配置中心相关项目",
                "createTime": 1505371484000,
                "updateTime": 1505445819000
              }, {
                "id": 6,
                "systemCode": "xyct",
                "projectName": "CPD",
                "projectCode": "6",
                "projectDesc": "CPD相关项目",
                "createTime": 1505371494000,
                "updateTime": 1505445819000
              }, {
                "id": 7,
                "systemCode": "xyct",
                "projectName": "Appstore",
                "projectCode": "7",
                "projectDesc": "Appstore",
                "createTime": 1505389844000,
                "updateTime": 1505445819000
              }, {
                "id": 11,
                "systemCode": "xyct",
                "projectName": "CPD4",
                "projectCode": "11",
                "projectDesc": "CPD4",
                "createTime": 1505389882000,
                "updateTime": 1505445819000
              }, {
                "id": 13,
                "systemCode": "xyct",
                "projectName": "配置中心1",
                "projectCode": "13",
                "projectDesc": "配置中心1",
                "createTime": 1505389895000,
                "updateTime": 1505445819000
              }, {
                "id": 14,
                "systemCode": "xyct",
                "projectName": "配置中心2",
                "projectCode": "14",
                "projectDesc": "配置中心2",
                "createTime": 1505389904000,
                "updateTime": 1505445819000
              }, {
                "id": 15,
                "systemCode": "xyct",
                "projectName": "效果广告",
                "projectCode": "15",
                "projectDesc": "效果广告",
                "createTime": 1505389926000,
                "updateTime": 1505445819000
              }, {
                "id": 16,
                "systemCode": "xyct",
                "projectName": "天下无双",
                "projectCode": "16",
                "projectDesc": "天下无双",
                "createTime": 1505389933000,
                "updateTime": 1505445819000
              }, {
                "id": 17,
                "systemCode": "xyct",
                "projectName": "中国人生",
                "projectCode": "17",
                "projectDesc": "中国人生",
                "createTime": 1505389984000,
                "updateTime": 1505445819000
              }, {
                "id": 18,
                "systemCode": "xyct",
                "projectName": "效果广告11",
                "projectCode": "18",
                "projectDesc": "1",
                "createTime": 1505389985000,
                "updateTime": 1506426859000
              }, {
                "id": 19,
                "systemCode": "xyct",
                "projectName": "效果广告11111",
                "projectCode": "19",
                "projectDesc": "11111",
                "createTime": 1505389998000,
                "updateTime": 1505445819000
              }
              ]
            }
          }
          ]);
        }, 500);
      });
    });


  }
};