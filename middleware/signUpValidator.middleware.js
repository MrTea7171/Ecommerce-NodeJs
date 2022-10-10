const { User,ROLES } = require("../models");

const checkDuplicateDetails=(req,res,next)=>{

    const {userName,email}=req.body;

    //Verifying Data
    if(!userName)
    {
        res.status(400).send({message:"Username cannot be empty"});
        return;
    }

    if(!email)
    {
        res.status(400).send({message:"Email cannot be empty"});
        return;
    }

    if(!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(email))
    {
        res.status(400).send({message:"Email format is invalid"});
        return;
    }

    //Checking Dupicate

    const p1=User.findOne({
        where:{
            userName:userName
        }
    });

    const p2=User.findOne({
        where:{
            email:email
        }
    });

    Promise.all([p1,p2])
    .then((users)=>{
        console.log(users);
        if(users[0])
        {
            res.status(400).send({message:"Failed! UserName is already in use."});
            return;
        }
        if(users[1])
        {
            res.status(400).send({message:"Failed! Email is already in use."});
            return;
        }

        next();
    });

    
}

const checkRolesExists=(req,res,next)=>{
    const roles=req.body.roles;

    if(roles)
    {
        roles.forEach(element=>{
            if(!ROLES.includes(element))
            {
                res.status(400).send({message:"Failed! Roles does not exist."});
                return;
            }
        });
    }

    next();

}

module.exports={
    checkDuplicateDetails,
    checkRolesExists
}