var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alumnoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre del alumno es obligatorio'] },
    apellido: { type: String, required: [true, 'Los apellidos del alumno es obligatorio'] },
    edad: { type: Number, required: [true, 'La edad del alumno es obligatorio'] },
    sexo: { type: String, required: [true, 'El sexo del alumno es obligatorio'] },
    salon: [{ type: String }]
}, { collection: 'alumnos' });

module.exports = mongoose.model('Alumno', alumnoSchema);