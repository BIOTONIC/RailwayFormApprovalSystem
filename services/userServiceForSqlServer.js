var mssql = require('../others/db').mssql;
var conf = require('../others/config');

module.exports = {
    findUserByName: function findUserByName(username) {
        return mssql.connect(conf.mssql)
            .then(pool => {
                return pool.request()
                    .input('input_parameter', mssql.NVarChar, username)
                    .query('select top 1 * from emptb where Name = @input_parameter order by Sort ASC')
            });
    },

    findByParentId: function findByParentId(id) {
        return mssql.connect(conf.mssql)
            .then(pool => {
                return pool.request()
                    .input('input_parameter', mssql.Int, id)
                    .query('select top 1 * from depttb where ID = @input_parameter order by Sort ASC')
            });
    }
}
