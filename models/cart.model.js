module.exports=(Sequelize,sequelize)=>{
    const Cart=sequelize.define("cart",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        cost:{
            type:Sequelize.INTEGER
        }
    },{
        tableName:"carts"
    });
    return Cart;
}