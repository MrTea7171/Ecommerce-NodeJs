const categoryControllers=require("../controllers/categories.controllers");
const {requestValidator,authJWT}=require("../middleware");

module.exports=(app)=>{

    //Create Category
    app.post("/ecomm/api/v1/category",[authJWT.verifyToken,authJWT.adminCheck,requestValidator.validateCategoryRequest],categoryControllers.create);

    //Get all Categories
    app.get("/ecomm/api/v1/category",categoryControllers.getAll);

    //Get Category by ID
    app.get("/ecomm/api/v1/category/:id",categoryControllers.getOne);

    //Update a Category
    app.put("/ecomm/api/v1/category/:id",[authJWT.verifyToken,authJWT.adminCheck],categoryControllers.update);

    //Delete a Category
    app.delete("/ecomm/api/v1/category/:id",[authJWT.verifyToken,authJWT.adminCheck],categoryControllers.delete);

}