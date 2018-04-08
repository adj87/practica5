'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
	nombre :String,
	email : String,
	password : String,
})


userSchema.statics.hashPassword = function(plain) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plain, 10, function(err, hash) {
      if (err) {
        reject(err);
        return;
      }
      resolve(hash);
    });
  });
}
// userSchema.statics.listar = function (filter, sort, limit, skip) {
//     // definimos la query aplicando los filtro de nombre,rango de precios
//     var query = Anuncio.find(filter);
//     //Ordenamos
//     query.sort(sort);
//     //Definimos numero de resultados a mostrar
//     query.limit(limit);
//     //Saltamos los resultados que queramos
//     query.skip(skip);
//     //Ejecutamos la query
//     return query.exec();
// };

// anuncioSchema.statics.listarTags = function() {
//   return Anuncio.find().distinct('tags')
// };

const User = mongoose.model('User', userSchema)

module.exports = User