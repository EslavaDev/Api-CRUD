'use strict'
const Product = require('../models/product');

function getProduct(req, res){
	let productId = req.params.id;

	Product.findById(productId, (err,product)=>{
		if(err){
			res.status(500).send({message: 'error al devolver el producto'});	
		}
		if(!product){
			res.status(404).send({message: 'no hay producto'});
		}
		res.status(200).send({product});
			
		
	});
}

function getProducts(req, res){
	Product.find({},(err, products)=>{
		if(err){
			res.status(500).send({message: 'Error al delvolver los products'});
		}else{
			if(!products){
				res.status(404).send({message: 'no hay products'});
			}else{
				res.status(200).send({products});
			}
		}
	});
}

function saveProduct(req, res){
	let product = new Product();

	let params = req.body;
	product.name = params.name;
	product.description = params.description;
	product.picture = params.picture;
	product.price = params.price;
	product.category = params.category;
	product.save((err, productStored)=>{
		if(err){
			res.status(500).send({message: 'Error del servidor'});
		}else{
			res.status(200).send({product: productStored});
		}
	});	
}

function deleteProduct(req, res){
	let id = req.params.id;

	Product.findById(id, (err, productRemove)=>{
		if(err){
			res.status(500).send({message: 'Error del servidor'});
		}else{
		if(!productRemove){
			res.status(404).send({message: 'no hay producto '});
		}else{
			productRemove.remove(err => {
				if(err){
					res.status(500).send({message: 'no se pudo eliminar el producto'});
				}else{
					res.status(200).send({message: 'se elimino correctamente el producto'});
				}
			});

			}
		}
	});
}

function updateProduct(req, res){
	let productId = req.params.id;
	let update = req.body;

	Product.findByIdAndUpdate(productId, update, (err,productUpdate) =>{
		if(err){
			res.status(500).send({message: 'Error del servidor'});
		}else{
		res.status(200).send({product: productUpdate});
		}
	});
}


module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	deleteProduct,
	updateProduct
}