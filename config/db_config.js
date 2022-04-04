const db_config = {

    HOST: process.env.DB_HOST || 'mysql.margarida-ramos.dreamhosters.com',
    USER: process.env.DB_USER || 'margaridapw2',
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME || 'pwii',
    dialect: "mysql"
};

module.exports = db_config