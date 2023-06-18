const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt.js');


const login = async(req, res = response) => {

    const { login, password } = req.body;

    try {
      
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ login });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Login / Password no son correctos - correo'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Login / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id, usuario.nombre );

        res.json({
            msg:"Hola "+login+" has ingresado al sistema satisfactoriamente",
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }   

}



module.exports = {
    login
}
