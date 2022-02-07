const router = require("express").Router();
const product = require("../models/product");

//CRUD operations

//Create product - post 
router.post("/",(req, res)=> {

    data = req.body;

    product.insertMany(data)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message}); })
});

//Read all products - get 
router.get("/",(req, res)=> {
    product.find()
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message}); })
});

//Read all products in stock - get
router.get("/instock",(req, res)=> {
    product.find({ inStock:  true })
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message}); })
});

//Read specific products - get
router.get("/:id",(req, res)=> {
    product.findById(req.params.id)
    .then(data => {res.send(data);})
    .catch(err => {res.status(500).send({message: err.message}); })
});

//Update specific product - put 

//Delete specific product - delete

module.exports = router;