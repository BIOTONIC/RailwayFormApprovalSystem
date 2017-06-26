module.exports = {
    title: '在线表格审批系统',
    author: '作者：杨博 王天然',
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'railway'
    },
    mssql: {
        server: '10.66.188.8',
        user: 'thrid',
        password: 'thrid',
        database: 'BJTXD',
        pool: {
            max: 100,
            min: 0
        },
        options: {
            tdsVersion: '7_1'
        },
        parentId: {
            manager: 674,
            department: 1273,
            workshopmgr: 1274
        },
        id: {
            wuxiantechdepart: 1118,
            gongchengshidepart: 1356,
            gaosutechdepart: 1423,
            youxiantechdepart: 1792,
            securedepart: 1276
        }
    },
    sessionPool: {},
    userTableFromSqlServer: false,
}