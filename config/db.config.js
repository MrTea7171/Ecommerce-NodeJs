module.exports = {
  development: {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'relevel',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, //max time in ms that a pool will try to get connection before throwing error
      idle: 10000 // maximum time in ms that a connection can be idle before being released
    }
  },
  production: {
    HOST: 'sql6.freemysqlhosting.net',
    USER: 'sql6526755',
    PASSWORD: 'l1Hk1UqfbI',
    DB: 'sql6526755',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, //max time in ms that a pool will try to get connection before throwing error
      idle: 10000 // maximum time in ms that a connection can be idle before being released
    }
  }
};
