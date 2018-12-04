var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var http = require('http');
var fs = require('fs');
var path = require('path');


function onRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('/public/home.html', null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

http.createServer(onRequest).listen(8000);

var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Server index config
app.use(express.static(__dirname + '/public'));
//app.use('/static', express.static(path.join(__dirname, 'public')));

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/colegioDB', { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de Datos: \x1b[32m%s\x1b[0m', ' online');
});

// Importar rutas
var appRoutes = require('./routes/app');
var salonRoutes = require('./routes/salon.js');
var profesorRoutes = require('./routes/profesor.js');
var alumnoRoutes = require('./routes/alumno.js');
var busquedaRoutes = require('./routes/busqueda.js');


// Rutas
app.use('/busqueda', busquedaRoutes);
app.use('/alumno', alumnoRoutes);
app.use('/profesor', profesorRoutes);
app.use('/salon', salonRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', ' online');
});