const path=require("path");
const userControllers=require(path.join(__dirname,"../controllers/user.controllers"));

module.exports=(app)=>{
    app.get("/ecomm/api/v1/users",userControllers.getAll);
};