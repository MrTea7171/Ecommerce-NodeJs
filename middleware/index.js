const requestValidator=require("./requestValidator.middleware");
const signUpValidator=require("./signUpValidator.middleware");
const authJWT=require("./authJWT");

module.exports={
    requestValidator,
    signUpValidator,
    authJWT
}