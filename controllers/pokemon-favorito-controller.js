const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const axios = require('axios');

const Usuario = require('../models/usuario');
const PokemonFavorito = require('../models/pokemon-favorito');


const pokemonesFavoritosGet = async(req = request, res = response) => {

    const { id } = req.params;
    const query = { usuario: id };

    const [ pokemonesUsuarios ] = await Promise.all([
        PokemonFavorito.find(query)
    ]);

    res.status(200).json({
        pokemonesUsuarios
    });
}

const pokemonesFavoritosPost = async(req, res = response) => {

    const {idUsuario, pokemon } = req.body;
    const query = { usuario: idUsuario, pokemon: pokemon };

    const [ total, usuarios ] = await Promise.all([
        PokemonFavorito.countDocuments(query),
        PokemonFavorito.find(query)
    ]);

    let pokemonFavorito = null;

    if(total == 0){
        let response = null;

        try {
            response = await axios.get(`${process.env.URLBASEPOKEAPI}/${pokemon}/`);
        } catch (error) {
            return res.status(500).json({
                msg: `No se pudo acceder al servicio PokeAPI`
            });
        }

        pokemonFavorito = new PokemonFavorito({ usuario: idUsuario, pokemon: response.data.id, nombre: response.data.name, experiencia_base: response.data.base_experience });

        // Guardar en BD
        await pokemonFavorito.save();
    } else{
        pokemonFavorito = usuarios[0];
    }


    res.status(201).json({
        pokemonFavorito
    });
}

const pokemonesFavoritosDelete = async(req, res = response) => {

    const { id } = req.params;

    const registro = await PokemonFavorito.deleteOne({_id:id});

    res.status(200).json({
        msg:"Registro borrado satisfactoriamente"
    });
}

module.exports = {
    pokemonesFavoritosGet,
    pokemonesFavoritosPost,
    pokemonesFavoritosDelete
}