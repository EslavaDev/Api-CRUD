'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services');

function signUp(req,res){
	const user = new User({
		email: req.body.email,
		displayName: req.body.displayName,
		password: req.body.password
	});
	user.save((err)=>{
		if(err) res.status(500).send({ message: `error al crear el usuario: ${err}`})
		return res.status(200).send({token: service.createToken(user)})			
	})
}

function signIn(req,res){
	const request = {
		email: req.body.email || '',
		password: req.body.password || ''
	};
	User.find(request, (err, user) =>{
		if(err) return res.status(500).send({message: err});
		console.log(request);
		if(user.length == 0) return res.status(404).send({message: 'no existe el usuario'});
			req.user = user;
			console.log(req.user);
			res.status(200).send({
				message: 'te has logueado correctamente',
				token: service.createToken(user)
			})
	})

}

module.exports = {
	signUp,
	signIn
}

