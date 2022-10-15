const {Product}=require("../../../models");
const productController=require("../../../Controllers/product.controllers");
const {mockRequest,mockResponse}=require("../intercepter");
const newProductData=require("../../mock-data/new-product.json");

let req,res;

beforeEach(()=>{
    req=mockRequest();
    res=mockResponse();
});

describe("Product Controller creat test",()=>{
    beforeEach(()=>{
        req.body=newProductData;
        req.isAdmin=true;
    });

    afterEach(()=>{
        jest.clearAllMocks();
    });
    
    it("happy case for create product call",async()=>{

        const spy=jest.spyOn(Product,"create")
        .mockImplementation((newProductData)=>{
            return Promise.resolve(newProductData);
        })


        await productController.create(req,res);

        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newProductData);
        
    });

    it("error case for create product call",async()=>{

        const spy=jest.spyOn(Product,"create")
        .mockImplementation((newProductData)=>{
            return Promise.reject(new Error("This is an Error"));
        })


        await productController.create(req,res);

        await expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({message:"Something Went Wrong"});
        
    });

    it("create called with normal user",async()=>{

        req.isAdmin=false;
    
        const spy=jest.spyOn(Product,"create")
        .mockImplementation((newProductData)=>{
            return Promise.resolve(newProductData);
        })


        await productController.create(req,res);

        expect(spy).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalled();
        
    });

})