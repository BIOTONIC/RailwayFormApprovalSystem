module.exports = {
    title: '在线表格审批系统',
    author: '作者：杨博 王天然',
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'railway'
    },
    // http://tediousjs.github.io/tedious/api-connection.html#function_newConnection
    sqlserver: {
        server: 'localhost',
        userName: 'test',
        password: 'test',
        options: {
            debug: {
                packet: true,
                data: true,
                payload: true,
                token: false,
                log: true
            },
            database: 'DBName',
            encrypt: true // for Azure users
        }
    },
    userTableFromSqlServer: false,
}