const path=require("path");
const {signUpValidator,requestValidator}=require(path.join(__dirname,"../middleware"));
const authController=require(path.join(__dirname,"../controllers/auth.controllers"));

module.exports=(app)=>{

    //Sign Up Api
    app.post("/ecomm/api/v1/signup",[signUpValidator.checkDuplicateDetails,signUpValidator.checkRolesExists],authController.signUp);

    //Sign In Api
    app.post("/ecomm/api/v1/signin",requestValidator.checkUserDetails,authController.signIn);
};