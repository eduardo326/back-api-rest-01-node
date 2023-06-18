const Usuario = require('../models/usuario');
const PokemonFavorito = require('../models/pokemon-favorito');

/**
 * Funcion para validar si un Login ya existe
 */
const loginExiste = async( login = '' ) => {

    const existeLogin = await Usuario.findOne({ login });
    if ( existeLogin ) {
        throw new Error(`El login: ${ login }, ya está registrado`);
    }
}

/**
 * Funcion para validar si un Email ya existe
 */
const emailExiste = async( email = '' ) => {

    const existeEmail = await Usuario.findOne({ email });
    if ( existeEmail ) {
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
}

/**
 * Funcion para validar por ID si un Usuario existe
 */
const existeUsuarioPorId = async( id ) => {

    const existe = await Usuario.findById(id);
    if ( !existe ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Funcion para validar por ID si un Usuario existe
 */
const existePokemonDeUsuarioFavoritoPorId = async( id ) => {

    const existe = await PokemonFavorito.findById(id);
    if ( !existe ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    loginExiste,
    emailExiste,
    existeUsuarioPorId,
    existePokemonDeUsuarioFavoritoPorId
}
