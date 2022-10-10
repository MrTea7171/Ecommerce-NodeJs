const { Cart, Product, User } = require("../models");


exports.create=async(req,res)=>{

    const userId=req.user.id;
    const user=await User.findByPk(userId);


    const cart_data={};

    const cart=await Cart.create(cart_data);
    cart.setUser(user);

    res.status(200).send("Cart is ready");
};

exports.getCart=async (req,res)=>{
    const userId=req.user.id;

    try{
        const{cart,product}=await getCartAndProducts(userId);
        cart_data={};
        cart_data.id=cart.id;
        let products=[];
        product.forEach(element=>{
            let product_data={};
            product_data.id=element.id;
            product_data.name=element.name;
            product_data.cost=element.cost;
            products.push(product_data)
        });
        cart_data.products=products;
        cart_data.cost=cart.cost;
        res.status(200).send(cart_data);
    }
    catch(err)
    {
        res.status(500).send({message:"Something Went Wrong"+err.message});
    }
    
};

exports.empty=async (req,res)=>{
    const userId=req.user.id;
    try {
        const { cart, product } = await getCartAndProducts(userId);

        const updatedProducts=[];

        await Cart.update({cost:0},{where:{
            id:cart.id
        }});

        await cart.setProducts(updatedProducts);

        res.status(200).send({message:"Cart is now empty"});
    }
    catch(err)
    {
        res.status(500).send({message:"Something Went Wrong"+err.message});
    }
};

exports.update=async (req,res)=>{
    const userId=req.user.id;
    try {
        const { cart, product } = await getCartAndProducts(userId);

        let items=req.body.items;
        for(let i=0;i<product.length;i++)
        {
            if(items.includes(product[i].id))
            {
                items=items.filter(element=>element!=product[i].id)
            }
        }

        let newProducts = await Product.findAll({
            where: {
            id: items
            }
        })
        if(!newProducts){
            res.status(400).send({message:"No product exists from the given product Id's"});
        }

        const updatedProducts=[...product, ...newProducts];

        const totalCost = findTotalCost(updatedProducts);
        await Cart.update({cost:totalCost},{where:{
            id:cart.id
        }});

        await cart.setProducts(updatedProducts);

        res.send(updatedProducts);
    }
    catch(err)
    {
        res.status(500).send({message:"Something Went Wrong"+err.message});
    }
};

exports.deleteOneProduct=async(req,res)=>{
    const userId=req.user.id;
    try {
        const { cart, product } = await getCartAndProducts(userId);

        const productId=req.params.productId;
        const updatedProducts=product.filter(element=>element.id !=productId);
        const totalCost = findTotalCost(updatedProducts);
        await Cart.update({cost:totalCost},{where:{
            id:cart.id
        }});
        
        await cart.setProducts(updatedProducts);

        res.send(updatedProducts);
    }
    catch(err)
    {
        res.status(500).send({message:"Something Went Wrong"+err.message});
    }
};


const getCartAndProducts=async (userId)=>{
    const user=await User.findByPk(userId);
    const cartDetails=await user.getCart();
    if(!cartDetails){
        res.status(400).send({message:"No Cart associated with the user"});
    }
    const cart=await Cart.findByPk(cartDetails.id);
    const product=await cart.getProducts();

    return {cart,product};
}

const findTotalCost=(products)=>{
    let cost=0;
    for(let i=0;i<products.length;i++){
        cost+= products[i].cost;
    }
    return cost;
}