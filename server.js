const serverConfig = require(path.join(__dirname,'./config/server.config'));
const express=require('express');
const bodyParser=require("body-parser");

const {Role,ROLES}=require(path.join(__dirname,'./models'));

const app=express();

app.use(bodyParser.json())

const db=require(path.join(__dirname,'./models'));

db.sequelize.sync({force:false})
.then(()=>{
    console.log("Db Scyn");
});

//authentication routes
require(path.join(__dirname,"./routes/auth.routes"))(app);

//category routes
require(path.join(__dirname,"./routes/category.routes"))(app);

//product routes
require(path.join(__dirname,"./routes/product.routes"))(app);

//user routes
require(path.join(__dirname,"./routes/user.routes"))(app);

//cart routes
require(path.join(__dirname,"./routes/cart.routes"))(app);

//Create Mock Roles

ROLES.forEach(element=>{
    Role.create({
        name:element
    });
});





app.listen(serverConfig.PORT,()=>{
    console.log("Application is running on: "+serverConfig.PORT);
});