var express = require('express');

var app = express();

var Salon = require('../models/salon');

// ======================================
// Obtener todos los Salones
// ======================================

app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Salon.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, salones) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Salon',
                        errors: err
                    });
                }
                Salon.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        salones: salones,
                        total: conteo
                    });
                });

            });

});



// ======================================
// Actualizar Salon
// ======================================
app.put('/:id', (req, res) => {

    var body = req.body;
    var id = req.params.id;

    Salon.findById(id, (err, salon) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Salon',
                errors: err
            });
        }
        if (!salon) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El Salon con el id' + id + ' no existe',
                errors: { mensaje: 'No existe un Salon con es ID' }
            });
        }
        salon.nombre = body.nombre;
        salon.usuario = req.usuario._id;

        salon.save((err, salonGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Salon',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                salon: salonGuardado
            });
        });
    });

});

// ======================================
// Crear un nuevo Salon
// ======================================
app.post('/', (req, res) => {
    var body = req.body;
    var salon = new Salon({
        codigo: body.codigo,
        capacidad: body.capacidad,
        edificio: body.edificio,
        piso: body.piso
    });

    salon.save((err, salonGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Salon',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            salon: salonGuardado
        });
    });
});
// ======================================
// Eliminar un nuevo Salon
// ======================================
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Salon.findByIdAndRemove(id, (err, salonBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Salon',
                errors: err
            });
        }
        if (!salonBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe Salon con el  id' + id,
                errors: { mensaje: 'No existe un Salon con es ID' }
            });
        }
        res.status(200).json({
            ok: true,
            salon: salonBorrado
        });

    });

});

module.exports = app;