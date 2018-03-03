'use strict'

const app = require('./app');
const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.db,(err, res)=>{

	if(err){
		throw err;	
	}else{
		console.log('Conexion a MongoDB correcta');
		app.listen(config.port, ()=>{
		console.log(`API REST funcionando en http://localhost:${config.port}`);
		});
	}


});

