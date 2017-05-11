var db = require('../others/db');

var sqlserver = db.sqlserver;

module.exports = {
    findUserByName: function findUserByName(username) {
        var results=[];

        sqlserver.conection.on('connect', function (err) {
            var request = new sqlserver.request("select * from user where username = " + username, function (err, rowCount) {
                if (err) {
                    console.log(err);
                } else {
                    // TODO  返回结果？
                    // console.log(rowCount + ' rows');
                    return results;
                }
            });

            request.on('row', function(columns) {
                var row = {};
                columns.forEach(function(column) {
                    row[column.metadata.colName] = column.value;
                });
                results.push(row);
            });

            // SQL Server 2000: execSqlBatch
            // Other Versions: execSql
            sqlserver.conection.execSqlBatch(request);
        });
    }
}
