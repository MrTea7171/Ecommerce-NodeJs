const path=require("path");
const {authJWT}=require(path.join(__dirname,"../middleware"));
const cartControllers=require(path.join(__dirname,"../controllers/cart.controllers"));

module.exports=(app)=>{

    //create cart
    app.post("/ecomm/api/v1/cart",[authJWT.verifyToken],cartControllers.create);

    //get cart for user
    app.get("/ecomm/api/v1/cart",[authJWT.verifyToken],cartControllers.getCart);

    //update cart for user
    app.put("/ecomm/api/v1/cart",[authJWT.verifyToken],cartControllers.update);

    //delete product from cart for user
    app.put("/ecomm/api/v1/cart/product/:productId",[authJWT.verifyToken],cartControllers.deleteOneProduct);

    //update cart for user
    app.put("/ecomm/api/v1/cart/empty",[authJWT.verifyToken],cartControllers.empty);
}