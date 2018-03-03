'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
	name: String,
	picture: String,
	category: String,
	price: Number,
	description: String
},
{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('Product', ProductSchema);