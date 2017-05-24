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
        server: '10.78.119.201',
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
            manager: 0,
            department: 1273,
            workshopmgr: 1274
        },
        id: {
            gaosutechdepart: 1423,
            wuxiantechdepart: 1118,
            youxiantechdepart: 1792,
            securedepart: 1276
        }
    },
    sessionPool: {},
    userTableFromSqlServer: true,
}