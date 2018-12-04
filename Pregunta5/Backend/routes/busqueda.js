var express = require('express');

var app = express();

var Salon = require('../models/salon');
var Profesor = require('../models/profesor');
var Alumno = require('../models/alumno');


//=============================================
// Busqueda Especifica
//=============================================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {
    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;
    switch (tabla) {
        case 'alumnos':
            promesa = buscarAlumnos(busqueda, regex);
            break;
        case 'profesores':
            promesa = buscarProfesores(busqueda, regex);
            break;
        case 'salones':
            promesa = buscarSalones(busqueda, regex);
            break;
        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda solo son: alumnos, profesores y salones',
                error: { message: 'Tipo de tabla/coleccion no valido' }
            });


    }
    promesa.then(data => {
        return res.status(200).json({
            ok: true,
            [tabla]: data
        });
    });
});




//=============================================
// Busqueda General
//=============================================
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
        buscarSalones(busqueda, regex),
        buscarProfesores(busqueda, regex),
        buscarAlumnos(busqueda, regex)
    ]).then(respuestas => {
        res.status(200).json({
            ok: true,
            salones: respuestas[0],
            profesores: respuestas[1],
            alumnos: respuestas[2]
        });
    });

});

function buscarSalones(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Salon.find({ codigo: regex }, 'codigo capacidad edificio piso')
            //.populate('codigo', 'capacidad edificio piso')
            .exec((err, salones) => {
                if (err) {
                    reject('Error al cargar salones', err);
                } else {
                    resolve(salones);
                }
            });
    });

}

function buscarProfesores(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Profesor.find({}, 'nombre apellido salon')
            .or([{ 'nombre': regex }, { 'apellido': regex }])
            //.populate('nombre', 'apellido salon')
            .exec((err, profesores) => {
                if (err) {
                    reject('Error al cargar profesores', err);
                } else {
                    resolve(profesores);
                }
            });
    });

}

function buscarAlumnos(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Alumno.find({}, 'nombre apellido salon')
            .or([{ 'nombre': regex }, { 'apellido': regex }])
            .exec((err, alumnos) => {
                if (err) {
                    reject('Error al cargar alumnos', err);
                } else {
                    resolve(alumnos);
                }
            });
    });

}


module.exports = app;