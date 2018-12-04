var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profesorSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    apellido: { type: String, required: [true, 'El apellido es necesario'] },
    especialidad: { type: String, required: [true, 'La especialidad es necesario'] },
    edad: { type: Number, required: [true, 'La edad es necesario'] },
    salon: [{ type: String }]
}, { collection: 'profesores' });

module.exports = mongoose.model('Profesor', profesorSchema);