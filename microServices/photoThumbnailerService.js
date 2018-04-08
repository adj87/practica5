'use strict'


const cote = require('cote');
const responder = new cote.Responder({name : 'photo thumbnailer service'})
const jimp = require("jimp");
const path = require("path");
 
	// Jimp.read("../public/images/upload"+req.fileName, function (err, lenna) {
responder.on('convert', async (req, cb) => {
	try{	
		const image = await jimp.read(path.join(__dirname, '../public/images/uploads/')+req.name);
		const thumbnail = image.resize(100,100).write(path.join(__dirname, '../public/images/uploads/thumbnail/thumbnail')+req.name)
		cb({success:true, message:"Thumnbnail creado con éxito"})
	}
	catch(err){
		cb({success:false, message:"Error en la creacion del thumbnail", error_message:err})
	}

});