const Pool1 = require('pg').Pool;
const pool = new Pool1({
    user:process.env.USER || 'postgres',
    password:process.env.DB_PASS ||'admin',
    database:process.env.DB ||'allinone',
    host:process.env.DB_HOST ||'localhost',
    port: parseInt(process.env.PORT) || 5432
});

module.exports = pool;