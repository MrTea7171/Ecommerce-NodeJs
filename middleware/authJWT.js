const path=require("path");
const jwt=require("jsonwebtoken");
const {User}=require(path.join(__dirname,"../models"));

verifyToken=(req,res,next)=>{
    let token=req.headers["x-access-token"];

    if(!token)
    {
        return res.status(403).send({message:"JWT Token is missing"})
    }
    jwt.verify(token,process.env.SECRET_KEY,async (err,decoded)=>{
        if(err)
        {
            return res.status(401).send({message:"Unauthorised!"})
        }

        const userId=decoded.id;
        const user= await User.findByPk(userId);
        let roles=[];
        let allRoles=await user.getRoles();
        allRoles.forEach(role => {
        roles.push(role.name);
        });
        req.isAdmin=false;
        if(roles.includes('admin'))
        {
            req.isAdmin=true;
        }
        req.roles=roles;
        req.user=user.dataValues;
        next();
    })
}


adminCheck=(req,res,next)=>{
    if(!req.isAdmin)
    {
        return res.status(403).send({
            message: `Oops You are Unauthorised for this action!!`
          });
    }
    next();
}


const authJWT={
    verifyToken:verifyToken,
    adminCheck:adminCheck
}

module.exports=authJWT;