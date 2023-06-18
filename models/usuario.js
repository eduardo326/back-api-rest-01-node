
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    login: {
        type: String,
        required: [true, 'El login es obligatorio'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    }
});



UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...data  } = this.toObject();
    return data;
}

module.exports = model( 'Usuario', UsuarioSchema );
