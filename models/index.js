const env=process.env.NODE_ENV || 'development';
const dbConfig=require(path.join)[env];
const Sequelize=require('sequelize');

const sequelize=new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        dialect:dbConfig.dialect,
        operatorAliases:false,
        pool:{
            max:dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle
        }
});

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.Category=require("./category.model")(Sequelize,sequelize);
db.Product=require("./product.model")(Sequelize,sequelize);
db.User=require("./user.model")(Sequelize,sequelize);
db.Role=require("./role.model")(Sequelize,sequelize);
db.Cart=require("./cart.model")(Sequelize,sequelize);

db.Role.belongsToMany(db.User,{
    through:"user_roles",
    foreignKey:"roleId",
    otherKey:"userId"
});

db.User.belongsToMany(db.Role,{
    through:"user_roles",
    otherKey:"roleId",
    foreignKey:"userId"
});

db.User.hasOne(db.Cart);
db.Cart.belongsTo(db.User);

db.Cart.belongsToMany(db.Product,{
    through:"cart_products",
    foreignKey:"cartId",
    otherKey:"productId"
});

db.Product.belongsToMany(db.Cart,{
    through:"cart_products",
    foreignKey:"productId",
    otherKey:"cartId"
});

db.ROLES=["user","admin"];

module.exports=db;  