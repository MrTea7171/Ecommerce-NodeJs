const db=require("../models");
const Category=db.Category;

exports.create=function(req,res)
{
    const category={
        name:req.body.name,
        description:req.body.description
    };

    Category.create(category)
    .then(category=>{
        console.log(`Category ${category.name} created succesfully`);
        res.status(201).send(category);
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });

}

exports.getAll=function(req,res)
{
    Category.findAll()
    .then((categories)=>{
        res.status(201).send(categories);
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });
}

exports.getOne=function(req,res)
{
    let categoryId=req.params.id;
    Category.findByPk(categoryId)
    .then((category)=>{
        if(!category)
        {
            res.status(400).send({message:`Category with Id ${categoryId} does not exist`});
        }
        res.status(201).send(category);
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });
}

exports.update=function(req,res)
{
    let categoryId=req.params.id;

    const {name,description}=req.body;

    const category={};

    if(name)
    {
        category.name=name;
    }
    if(description)
    {
        category.description=description;
    }


    Category.update(category,{
        where:{id:categoryId}
    })
    .then((updatedCategory)=>{
        res.status(201).send({message:`Category updated successfully`});
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });
}

exports.delete=function(req,res)
{
    let categoryId=req.params.id;
    Category.destroy({
        where:{id:categoryId}
    })
    .then((data)=>{
        res.status(201).send({message:`Category deleted successfully`});
    })
    .catch((err)=>
    {
        res.status(500).send({message:"Something Went Wrong"});
    });
}