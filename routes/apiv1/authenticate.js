'use strict'

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();


const User = require('../../models/User');


router.post('/', async(req,res,next)=>{

    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password)

    const user = await User.findOne({ email: email });

    // Comprobar usuario encontrado y verificar la clave del usuario
    if (!user || !await bcrypt.compare(password, user.password)) {
      res.status(400)
      res.json({success: false, error: 'Wrong credentials'});
      return;
    }
    
    // el usuario está y coincide la password
    //incorporo el string supertest porque cuando hago el test no me pilla las variables de entorno definidas
    jwt.sign({ _id: user._id }, process.env.JWT_SECRET || "supertest", {
      expiresIn: '1d'
    }, (err, token) => {
      if (err) {
        next(err);
        return;
      }
      res.status(200)
      res.json({ success: true, token: token});
      return
    });

})

module.exports = router