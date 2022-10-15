const serverConfig = require('./config/server.config');
const express=require('express');
const bodyParser=require("body-parser");

const {Role,ROLES}=require("./models");

const app=express();

app.use(bodyParser.json())

const db=require('./models');

db.sequelize.sync({force:false})
.then(()=>{
    console.log("Db Scyn");
});

//authentication routes
require("./routes/auth.routes")(app);

//category routes
require("./routes/category.routes")(app);

//product routes
require("./routes/product.routes")(app);

//user routes
require("./routes/user.routes")(app);

//cart routes
require("./routes/cart.routes")(app);

//Create Mock Roles

ROLES.forEach(element=>{
    Role.create({
        name:element
    });
});





app.listen(serverConfig.PORT,()=>{
    console.log("Application is running on: "+serverConfig.PORT);
});