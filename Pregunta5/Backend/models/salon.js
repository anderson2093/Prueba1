var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salonSchema = new Schema({
    codigo: { type: String, required: [true, 'El codigo es necesario'] },
    capacidad: { type: Number, required: [true, 'La capacidad es necesario'] },
    edificio: { type: String, required: [true, 'El nombre del edificio es necesario'] },
    piso: { type: Number, required: [true, 'La capacidad es necesario'] }
}, { collection: 'salones' });

module.exports = mongoose.model('Salon', salonSchema);