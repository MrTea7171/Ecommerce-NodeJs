const {Product,Sequelize}=require("../models");

exports.create=function(req,res)
{
    const {name,description,cost,categoryId}=req.body;

    const product={
        name,
        description,
        cost,
        categoryId
    };

    Product.create(product)
    .then(product=>{
        console.log(`Category ${product.name} created succesfully`);
        res.status(201).send(product);
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });
}

exports.getAll=function(req,res)
{

    let finalPromise=null;
    if(req.query.name)
    {
        finalPromise=Product.findAll({
            where: { name:req.query.name} 
        });
    }
    else if(req.query.minCost && req.query.maxCost)
    {
        finalPromise=Product.findAll({
            where: { cost:{[Sequelize.Op.between]:[req.query.minCost,req.query.maxCost]}} 
        });
    }
    else if(req.query.minCost)
    {
        finalPromise=Product.findAll({
            where: { cost:{[Sequelize.Op.gte]:req.query.minCost}} 
        });
    }
    else if(req.query.maxCost)
    {
        finalPromise=Product.findAll({
            where: { cost:{[Sequelize.Op.lte]:req.query.maxCost}} 
        });
    }
    else
    {
        finalPromise=Product.findAll()
    }
    
    finalPromise
    .then((product)=>{
        res.status(201).send(product);
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });
}

exports.getProductsByCategory=function(req,res)
{

    const categoryId=req.params.categoryId;
    Product.findAll({
        where:{
            categoryId:categoryId
        }
    })
    .then((product)=>{
        res.status(201).send(product);
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });
}

exports.getProductByCategory=function(req,res)
{

    const categoryId=req.params.categoryId;
    const productId=req.params.productId;
    
    Product.findOne({
        where:{
            categoryId:categoryId,
            id:productId
        }
    })
    .then((product)=>{
        if(!product)
        {
            res.status(400).send({message:`Product in category ${category.name} does not exist.`});
        }
        res.status(201).send(product);
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });
}

exports.getOne=function(req,res)
{

    const productId=req.params.id;
    Product.findByPk(productId)
    .then((product)=>{
        if(!product)
        {
            res.status(400).send({message:`Product with id ${productId} does not exist.`});
        }
        res.status(201).send(product);
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });
}

exports.update=function(req,res)
{

    const productId=req.params.id;
    const {name,description,cost}=req.body;

    const product={};

    if(name)
    {
        product.name=name;
    }
    if(description)
    {
        product.description=description;
    }
    if(cost)
    {
        product.name=cost;
    }

    Product.update(product,{
        where:{
            id:productId
        }
    })
    .then((product)=>{
        res.status(201).send({messsage:`Product Updated Successfully`});
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });
}

exports.delete=function(req,res)
{

    const productId=req.params.id;

    Product.destroy({
        where:{
            id:productId
        }
    })
    .then((product)=>{
        res.status(201).send({messsage:`Product Deleted Successfully`});
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });
}