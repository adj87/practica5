var express = require('express');
var router = express.Router();
var i18n = require('i18n');
const Anuncio = require('../models/Anuncio');

/* GET home page. */

router.get('/',function(req, res, next) {
  Anuncio.find().exec().then(docs => {
	//renderizamos index con parametros
  	res.render('index', { anuncios : docs, message:null});
  }).catch(err => {
    next(err);
    return;
  });
});


module.exports = router;
