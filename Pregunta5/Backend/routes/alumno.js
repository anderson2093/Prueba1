var express = require('express');



var app = express();

var Alumno = require('../models/alumno.js');

// ======================================
// Obtener todos los Alumnos
// ======================================

app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Alumno.find({})
        //.populate('nombre', 'apellido especialidad edad salon')
        .skip(desde)
        .limit(5)
        .exec(
            (err, alumnos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Alumno',
                        errors: err
                    });
                }
                Alumno.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        alumnos: alumnos,
                        total: conteo
                    });
                });

            });

});



// ======================================
// Actualizar Alumno
// ======================================
app.put('/:id', (req, res) => {

    var body = req.body;
    var id = req.params.id;

    Alumno.findById(id, (err, alumno) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Alumno',
                errors: err
            });
        }
        if (!alumno) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El Alumno con el id' + id + ' no existe',
                errors: { mensaje: 'No existe un Alumno con es ID' }
            });
        }
        alumno.nombre = body.nombre;
        alumno.apellido = body.apellido;
        alumno.edad = body.edad;
        alumno.sexo = body.sexo;
        alumno.salon = body.salon;



        alumno.save((err, alumnoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Alumno',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                alumno: alumnoGuardado
            });
        });
    });

});

// ======================================
// Crear un nuevo Alumno
// ======================================
app.post('/', (req, res) => {
    var body = req.body;
    var alumno = new Alumno({
        nombre: body.nombre,
        apellido: body.apellido,
        edad: body.edad,
        sexo: body.sexo,
        salon: body.salon
    });

    alumno.save((err, alumnoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Alumno',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            alumno: alumnoGuardado
        });
    });
});
// ======================================
// Eliminar un nuevo Alumno
// ======================================
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Alumno.findByIdAndRemove(id, (err, alumnoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Alumno',
                errors: err
            });
        }
        if (!alumnoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe Alumno con el  id' + id,
                errors: { mensaje: 'No existe un Alumno con es ID' }
            });
        }
        res.status(200).json({
            ok: true,
            alumno: alumnoBorrado
        });

    });

});

module.exports = app;