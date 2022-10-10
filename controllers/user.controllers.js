const {User}=require("../models")

exports.getAll=(req,res)=>{
    User.findAll()
    .then(users=>{
        res.status(201).send(users);
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });
};