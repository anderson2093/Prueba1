var express = require('express');



var app = express();

var Profesor = require('../models/profesor.js');

// ======================================
// Obtener todos los Profesors
// ======================================

app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Profesor.find({})
        //.populate('nombre', 'apellido especialidad edad salon')
        .skip(desde)
        .limit(5)
        .exec(
            (err, profesores) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Profesor',
                        errors: err
                    });
                }
                Profesor.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        profesores: profesores,
                        total: conteo
                    });
                });

            });

});



// ======================================
// Actualizar Profesor
// ======================================
app.put('/:id', (req, res) => {

    var body = req.body;
    var id = req.params.id;

    Profesor.findById(id, (err, profesor) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Profesor',
                errors: err
            });
        }
        if (!profesor) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El Profesor con el id' + id + ' no existe',
                errors: { mensaje: 'No existe un Profesor con es ID' }
            });
        }
        profesor.nombre = body.nombre;
        profesor.apellido = body.apellido;
        profesor.especialidad = body.especialidad;
        profesor.edad = body.edad;
        profesor.salon = body.salon;



        profesor.save((err, profesorGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Profesor',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                profesor: profesorGuardado
            });
        });
    });

});

// ======================================
// Crear un nuevo Profesor
// ======================================
app.post('/', (req, res) => {
    var body = req.body;
    var profesor = new Profesor({
        nombre: body.nombre,
        apellido: body.apellido,
        especialidad: body.especialidad,
        edad: body.edad,
        salon: body.salon
    });

    profesor.save((err, profesorGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Profesor',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            profesor: profesorGuardado
        });
    });
});
// ======================================
// Eliminar un nuevo Profesor
// ======================================
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Profesor.findByIdAndRemove(id, (err, profesorBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Profesor',
                errors: err
            });
        }
        if (!profesorBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe Profesor con el  id' + id,
                errors: { mensaje: 'No existe un Profesor con es ID' }
            });
        }
        res.status(200).json({
            ok: true,
            profesor: profesorBorrado
        });

    });

});

module.exports = app;