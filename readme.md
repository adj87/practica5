# Practica número 3 


App de venta de artículos de segunda mano.

## Instalación

### Descarga Backend
	$ git clone https://github.com/adj87/practica3.git
	$ cd practica3

### Instalamos y arrancamos MongoDB
	
### Instalación de la base de datos
	
    Con este comando crearemos la db e insertaremos articulos de prueba y arrancamos el microservicio de thumbnailer
    
	$ npm run installdb


### Arrancando la APP
	$ npm install
	$ npm run thumbnailerservice
    $ npm start

## Operaciones que realiza la app
### Creación de nuevos anuncios 
La app permite insertar nuevos articulos en la dirección http://localhost:3000/, en el boton "añadiendo nuevo articulo" (a través del método POST).
### Listado de anuncios
En la página principal disponemos de un listado de anuncios mostrados en una tabla http://localhost:3000/
### Filtros

**Filtrado por nombre**
http://localhost:3000/apiv1/anuncios?nombre=jeep
**Filtrado se vende o se busca**
http://localhost:3000/apiv1/anuncios?venta=false
 **Filtrado por precio**: 
            -***Rango entre dos numeros***
                http://localhost:3000/apiv1/anuncios?precio=0-250
            -***Rango menor que un número***
                http://localhost:3000/apiv1/anuncios?precio=-175
            -***Rango mayor que un número***
                http://localhost:3000/apiv1/anuncios?precio=178-
**Filtrado por tag**:
                http://localhost:3000/apiv1/anuncios?tag=mobile
**Paginación**
        Paginacion realizada con los parámetros.
        http://localhost:3000/apiv1/anuncios?start=2&limit=2
### Listado de tags
http://localhost:3000/apiv1/anuncios/tags
### Login
Ahora podemos hacer login en el boton "iniciar sesion"; el cual nos devolverá un token. Ese token será requerido ahora para hacer peticiones a la dirección de la api :"http://localhost:3000/apiv1/anuncios"
## Multiidioma
La plataforma es ahora multiidioma, incorpora inglés y español. En el menú de navegación podremos cambiar el lenguaje
## Test
Podemos ejecutar los tres test que están en la carpeta test para verificar el buen funcionamiento de algunas de sus rutas (usando mocha)  

## URL
URL del despliegue de la app en [http://nodepop.mrjaurewi.com/](http://nodepop.mrjaurewi.com/)

