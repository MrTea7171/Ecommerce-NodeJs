const productControllers=require("../controllers/product.controllers");
const {authJWT,requestValidator}=require("../middleware")

module.exports=(app)=>{

    //Create Product
    app.post("/ecomm/api/v1/product",[authJWT.verifyToken,authJWT.adminCheck,requestValidator.validateProductRequest,requestValidator.validateCategoryExistence],productControllers.create);

    //Get all Product
    app.get("/ecomm/api/v1/product",productControllers.getAll);

    //Get Product by ID
    app.get("/ecomm/api/v1/product/:id",productControllers.getOne);

    //Get all Product by category
    app.get("/ecomm/api/v1/categories/:categoryId/product/",requestValidator.validateCategoryExistence,productControllers.getProductsByCategory);
    
    //Get one Product by category
    app.get("/ecomm/api/v1/categories/:categoryId/product/:productId",requestValidator.validateCategoryExistence,productControllers.getProductByCategory);

    //Update a Product
    app.put("/ecomm/api/v1/product/:id",[authJWT.verifyToken,authJWT.adminCheck],productControllers.update);

    //Delete a Product
    app.delete("/ecomm/api/v1/product/:id",[authJWT.verifyToken,authJWT.adminCheck],productControllers.delete);

}