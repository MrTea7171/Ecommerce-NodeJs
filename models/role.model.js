module.exports=(Sequelize,sequelize)=>{
    const Role=sequelize.define("role",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },
    {
        tableName:"roles"
    });

    return Role;
};