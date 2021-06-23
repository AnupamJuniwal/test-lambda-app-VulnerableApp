/* eslint-disable no-undef */
const mysql = require('mysql');
const {promisify} = require('../utils');
const database = mysql.createPool({
    connectionLimit: 100,
    host: process.env['MYSQL_HOST'],
    port: '3306',
    user: 'root',
    // password: process.env['MYSQL_ROOT_PASSWORD'],
    database: process.env['MYSQL_DB'],
    debug: false,
    multipleStatements: true
});

exports.fn = async (args) => {
    const appData = {};
    const [email, password] = args;

    try {
        const connection = await promisify(database, database.getConnection)();
        // SECURITY FINDING: MYSQL-Injection !!!
        // Disable mysql escaping for better injection
        // connection.query(`SET GLOBAL sql_mode = "NO_BACKSLASH_ESCAPES" `);
        //connection.query(`SET SESSION sql_mode = "NO_BACKSLASH_ESCAPES" `);
        // Vector: admin' OR '1'='1
        // See https://github.com/mysqljs/mysql#escaping-query-values for details about dangerous raw()
        const vulnerable_sql = mysql.raw('SELECT * FROM users WHERE email = \'' + email + '\' AND password = \'' + password + '\'');
        // console.log("SQL Query: " + vulnerable_sql.toSqlString());
        const rows = await promisify(connection, connection.query)(vulnerable_sql.toSqlString());
        if (rows.length > 0) {
            // TODO: Add jwt token signing
            /*token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                            expiresIn: 5000
                        });*/
            console.log(rows);
            appData.error = 0;
            appData['email'] = rows[0].email;
            //appData["token"] = token;
            return rows;

        } else {
            appData.error = 1;
            appData['data'] = 'Email does not exists or mail and Password does not match.';
            return appData;
        }
    } catch(err) {
        appData['error'] = err;
        appData['data'] = 'Internal Server Error';
        return appData;
    }
};
    
exports.moduleName = 'sqli';