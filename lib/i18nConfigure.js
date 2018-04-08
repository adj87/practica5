'use strict'

const i18n = require('i18n');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const autoReload = env ==='development';
const updateFiles = env ==="development";
const syncFiles = env ==="development";

module.exports = function(){
	i18n.configure({
		locales:['en','es'],
		directory: path.join(__dirname, '../locales'),
		defaultLocales: 'en',
		autoReload: autoReload,// regcarga locales si tienen cambios
		updateFiles: updateFiles,//crear ficheros de locale inexistentes
		syncFiles: syncFiles,// si creo un mensaje nuevo en un idioma lo genera en todos
		queryParameter: 'lang',// si creo un mensaje nuevo en un idioma lo genera en todos
		cookie: "myapp-lang"
	})

	i18n.setLocale('en');

	return i18n
}