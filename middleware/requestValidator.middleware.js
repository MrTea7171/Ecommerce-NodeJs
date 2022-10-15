const path=require("path");
const {Category}=require(path.join(__dirname,"../models"));

const validateCategoryRequest=(req,res,next)=>{
    if(!req.body.name)
    {
        res.status(404).send({message:"Name of Category cannot be empty"});
        return;
    }

    next();
};

const validateProductRequest=(req,res,next)=>{

    if(!req.body.name)
    {
        res.status(400).send({message:"Name of product can't be empty."});
        return;
    }

    if(!req.body.cost)
    {
        res.status(400).send({message:"Cost of product can't be empty."});
        return;
    }

    if(!req.body.categoryId)
    {
        res.status(400).send({message:"Category cannot of product can't be empty."});
        return;
    }

    next();
};

const validateCategoryExistence=(req,res,next)=>{
    if(!parseInt(req.body.categoryId))
    {
        res.status(400).send({message:`Category Id is paased in an invalid format`});
        next();
    }
    Category.findByPk(req.body.categoryId)
    .then((category)=>{
        if(!category)
        {
            res.status(400).send({message:`Category with Id ${req.body.categoryId} does not exist`});
        }
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong "});
    });

    next();
};

const checkUserDetails=(req,res,next)=>{
    const {userName,password}=req.body;
    if(!userName || !password)
    {
        res.status(400).send({message:"Username or Password cannot be empty."});
        return;
    }
    next();
}


module.exports={
    validateCategoryRequest:validateCategoryRequest,
    validateProductRequest:validateProductRequest,
    validateCategoryExistence:validateCategoryExistence,
    checkUserDetails:checkUserDetails
}