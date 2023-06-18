const { Schema, model } = require('mongoose');

const PokemonFavoritoSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    pokemon: {
        type: Number,
        required: true
    },
    nombre: {
        type: String
    },
    experiencia_base: {
        type: Number,
        default: 0
    }
});


PokemonFavoritoSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'PokemonFavorito', PokemonFavoritoSchema );
