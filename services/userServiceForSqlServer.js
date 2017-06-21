var mssql = require('../others/db').mssql;
var conf = require('../others/config');

module.exports = {
    findUserByName: function findUserByName(username) {
        return mssql.connect(conf.mssql)
            .then(pool => {
                return pool.request()
                    .input('input_parameter', mssql.NVarChar, username)
                    .query('select top 1 ID, Code, DeptID, SecuPassword from emptb where Name = @input_parameter ' +
                        'and StateTime is not null and LoginIp is not null and LoginDate is not null order by Sort ASC')
            });
    },

    findByParentId: function findByParentId(id) {
        return mssql.connect(conf.mssql)
            .then(pool => {
                return pool.request()
                    .input('input_parameter', mssql.Int, id)
                    .query('select top 1 ID, ParentID, Name from depttb where ID = @input_parameter order by Sort ASC')
            });
    },

    findWorkshop: function findWorkshop() {
        return mssql.connect(conf.mssql)
            .then(pool => {
                return pool.request()
                    .input('input_parameter', mssql.Int, conf.mssql.parentId.workshopmgr)
                    .query('select Name from depttb where ParentID = @input_parameter order by Sort ASC')
            });
    }
}
