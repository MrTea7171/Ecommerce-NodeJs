const path=require("path");
const requestValidator=require(path.join(__dirname,"./requestValidator.middleware"));
const signUpValidator=require(path.join(__dirname,"./signUpValidator.middleware"));
const authJWT=require(path.join(__dirname,"./authJWT"));

module.exports={
    requestValidator,
    signUpValidator,
    authJWT
}