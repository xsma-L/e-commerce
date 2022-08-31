require('dotenv').config();

const config = {
    db : {
        host: 'localhost',
        user: 'root',
        password: `${process.env.MYSQL_PASSWORD}`,
        database: 'watch-me'
    },
    listPerPage: 10,
};

module.exports = config;