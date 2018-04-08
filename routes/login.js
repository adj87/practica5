var express = require('express');
var router = express.Router();
var i18n = require('i18n');
const Anuncio = require('../models/Anuncio');

/* GET home page. */

router.get('/', async(req,res,next)=>{
	res.locals.error=''
	res.locals.email=''

	res.render('login')
})


module.exports = router;
