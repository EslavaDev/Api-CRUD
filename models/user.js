'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');


const UserSchema = Schema({
	email: {type: String, unique: true, lowercase:true},
	displayName: String,
	avatar: String,
	password: {type: String, select:false},
	signUpdate: {type:Date, default: Date.now()},
	lastLogin: {type:Date}
},
{
    versionKey: false // You should be aware of the outcome after set to false
});
	
UserSchema.pre('save',function(next)  {

	let user = this;
	if(!user.isModified('password')){
		return next();
	}else{
		bcrypt.genSalt(10, (err, salt) =>{
			if(err){
				return next(err);
			}else{
				bcrypt.hash(user.password, salt, null, (err, hash) =>{
					if(err) return next(err);

					user.password = hash;
					next();
				})
			}
		})
	}
});


UserSchema.methods.gravatar = ()=>{
	if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`;

	const md5 = crypto.createHash('md5').update(this.email).digest('hex');
	return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

module.exports = mongoose.model('User', UserSchema);