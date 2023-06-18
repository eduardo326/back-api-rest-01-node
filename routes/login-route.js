const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../midlewares/validacion-campos');


const { login } = require('../controllers/loginController');


const router = Router();

router.post('/',[
    check('login', 'El login es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );



module.exports = router;