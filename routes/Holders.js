const {Router} = require('express')
const {postHolders,postLogin, putHolders, getHolders, getHolder, putActive, putUnactivate} = require("../controllers/Holders")
const {helperHolder}=require('../helpers/Holders')
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require ('../middlewares/validar_jwt')
const { check } = require('express-validator');
const router= Router();
const {validar_jwt} = require ('jsonwebtoken') 




//insertar 
router.post("/",[

    check("email","El email es obligatorio").notEmpty(),
    check("email","El email debe ser unico").custom(helperHolder.validarEmail),
    check("password","la contraseña es obligatoria").notEmpty(),
    check("password","Minimo 8 caracteres").isLength({min:8}),
    check("password", "la contraseña debe ser unica").custom(helperHolder.validarContraseña),
    check("document", "el documento es obligatorio").notEmpty(),
    check("document","El documento ya existe").custom(helperHolder.validarDocument),
    check("ficha","La ficha debe de ser un numero").isNumeric(),
    check("ficha","La ficha ya existe").custom(helperHolder.validarFicha),
    check("name","El nombre es obligatorio").notEmpty(),
    check("rol","El rol es obligatorio").notEmpty(),
    check("phone","El telefono es obligatorio").notEmpty(),
    validarCampos
], postHolders)


//actualizar o modificar
router.put("/:id",[
    validarJWT,
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperHolder.validarId),
    validarCampos
],putHolders)


//listar por id
router.get("/:id",[
    validarJWT,
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperHolder.validarId),
    validarCampos
], getHolder)

// listar todos
router.get("/", getHolders)

//activar
router.put("/activate/:id",[
    validarJWT,
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperHolder.validarId),
    validarCampos
], putActive)

//inactivar
router.put("/unactivate/:id",[
    validarJWT,
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperHolder.validarId),
    validarCampos
], putUnactivate)


//logearse
router.post("/login",[
    check("email","El email es obligatorio").notEmpty(),
    check("password","la contraseña es obligatoria").notEmpty(),
],postLogin)

module.exports=router