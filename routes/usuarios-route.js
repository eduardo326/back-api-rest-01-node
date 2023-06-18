
const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../midlewares/validacion-campos');

const { usuariosGet,
        usuariosPost } = require('../controllers/usuarios-controller');

const { pokemonesFavoritosGet,
        pokemonesFavoritosPost,
        pokemonesFavoritosDelete } = require('../controllers/pokemon-favorito-controller');

const { loginExiste,
        emailExiste,
        existeUsuarioPorId, 
        existePokemonDeUsuarioFavoritoPorId } = require('../midlewares/validaciones-bd');

const router = Router();


router.get('/', usuariosGet );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('login', 'El login es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom( emailExiste ),
    check('login').custom( loginExiste ),
    validarCampos
], usuariosPost );

//Rutas para gestionar pokemones favoritos de usuarios

router.get('/favorites/:id', [
    check('id', 'El ID no es un ID de Mongo valido').isMongoId(),
    validarCampos
], pokemonesFavoritosGet );

router.post('/favorites/', [
    check('pokemon', 'El pokemon es obligatorio').not().isEmpty(),
    check('pokemon', 'El campo pokemon debe ser numerico').isNumeric(),
    check('idUsuario', 'El idUsuario no es un ID de Mongo').isMongoId(),
    check('idUsuario').custom(existeUsuarioPorId),
    validarCampos
], pokemonesFavoritosPost );

router.delete('/favorites/:id', [
    check('id', 'El ID no es un ID de Mongo valido').isMongoId(),
    check('id').custom(existePokemonDeUsuarioFavoritoPorId),
    validarCampos
], pokemonesFavoritosDelete );


module.exports = router;