'use strict'

const express = require('express');
const ProductController = require('../controllers/product');
const UserCtrl = require('../controllers/auth');
const auth = require('../middlewares/auth');
const product = express.Router();


/*app.get('/prueba/:nombre'=== nos da a entender que el parametro es obligatorio y si 
*no lo introduciomos bloquea la ruta como si no sirviera.
*app.get('/prueba/:nombre?' === con el signo de interrogacion nos da a entender
*que el parametro es opcional y no bloquea esa ruta.
*/

product.get('/product/:id?', ProductController.getProduct);
product.get('/products', ProductController.getProducts);
product.post('/products', ProductController.saveProduct);
product.delete('/products/:id', ProductController.deleteProduct);
product.put('/products/:id', ProductController.updateProduct);
product.get('/private', auth, function(req,res){
	res.status(200).send({message: 'prueba de auth'});
});


product.post('/signup', UserCtrl.signUp);
product.post('/signip', UserCtrl.signIn);

module.exports = product;