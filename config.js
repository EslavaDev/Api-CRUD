module.exports = {
	port : process.env.PORT || 3678,
	portDB: process.PORTDB||27017,
	db : process.env.MONGODB || 'mongodb://localhost:27017/CarlosApiTuto',
	SECRET_TOKEN: 'test'
}