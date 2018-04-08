'use strict'

const express = require('express');
const router = express.Router();
var jwtAuth = require('../../lib/jwtAuth');
const Anuncio = require('../../models/Anuncio');
const uploadPhoto = require('../../lib/uploadConfig')
const cote = require('cote');



router.get('/',jwtAuth(), async (req, res, next) => { 

  try {
    //Recibimos todos los parametros de la query
    var tag = req.query.tag;
    var venta = req.query.venta;
    var nombre = req.query.nombre;
    var precio = req.query.precio || null;
    var skip = parseInt(req.query.start) || null;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;

    //creamos filter que estaraá compuesto de nombre,venta,precios y tags
    var filter = {};

    //Validamos nombre
    if (typeof nombre !== 'undefined') {
        filter.nombre = new RegExp('^'+ nombre,'i');
    }

    //Validamos parámetro venta
    if (typeof venta !== 'undefined') {
        filter.venta = venta;
    }

    //Validamos parámetro precio
    if (precio !== null) {

        var guionPosicion = precio.search("-"); 
        //Esta condicion es para ver si el rango esta comprendido entre dos valores
        if(guionPosicion!=0 && (guionPosicion!=precio.length-1) ) {
          var precioMin = precio.split("-")[0]
          var precioMax = precio.split("-")[1]
          filter.precio = { '$gte': parseInt(precioMin), '$lte': parseInt(precioMax) }
        }

        //Esta condicion verifica si es el rango de precio es menor que un numero
        else if(guionPosicion==0){
          filter.precio = { '$lte': parseInt(precio.split("-")[1]) };
        }

        //Esta condicion verifica si es el rango de precio es mayor que un numero
        else{
          filter.precio = { '$gte': parseInt(precio.split("-")[0]) };
        }
    }

    //Validamos parámetro tag
    if (typeof tag !== 'undefined') {
        filter.tags = { '$all': [tag] };
    }

    const docs = await Anuncio.listar(filter, sort, limit, skip);
    // res.status(200)    
    res.status(200).json(docs); 

  } catch(err) {
    next(err);
    return;
  }  
});


router.get('/tags', async (req, res, next) =>{
  
  try{
    const tags = await Anuncio.listarTags();
    res.json(tags)
  }catch(err) {
    next(err);
    return;
  }

})


router.post('/', uploadPhoto.single('imagen') ,(req,res,next) => {
  
  //guardamos datos en variable data
  const data = req.body;

  //añadimos la ruta de su foto
  data.foto = "images/uploads/"+req.file.filename

  //instanciamos un objeto de Anuncio
  const nuevoAnuncio = new Anuncio(data);

  // guardamos en la db
  nuevoAnuncio.save((err, anuncioGuardado) => {

    if (err) {
        next(err);
        return;
    }
    
    // en caso de que no haya error al guardar, llamamos al microservicio para hacer thumbnail de la foto.
    const requester = new cote.Requester({ name: 'photo thumbnailer service' });
  
    const request = { type: 'convert', name: req.file.filename };
  
    requester.send(request, (respuesta) => {

      if(respuesta.error_message) console.log(respuesta.error_message)
        
      //buscamos nuevamente los artiuclos
      Anuncio.find().exec().then(docs => {
      //renderizamos index con parametros
          res.render('index', {anuncios : docs, message: respuesta.message});

        }).catch(err => {
          next(err);
          return;
        });
    });
  })
    
})




module.exports = router