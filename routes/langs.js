var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:locale', function(req, res, next) {
  // recuperar lenguaje que me piden
  const locale = req.params.locale;
  
  // guardarme la página a la que volver
  const referer = req.get('referer');

  // establecer una cookie de idioma
  res.cookie('myapp-lang', locale, { maxAge: 900000 });
  
  // redirigir a la página donde estaba
  res.redirect(referer);
});

module.exports = router;
