const {Router} = require ("express")
const {postEntry, getlistarPorHolder, getListarPorDia, getListarPorFechas, putEntradaSalida} = require ("../controllers/Entrys")
const {helperEntry} = require ('../helpers/Entrys')
const {validarCampos} = require('../middlewares/validarCampos');
const { check } = require('express-validator');
const router = Router()


//insertar
router.post("/",[
    check("laptop","El campo laptop es obligatorio").notEmpty(),
    check("type","El tipo es obligatorio").notEmpty(),
    check("entrytime","La hora de entrada es obligatoria").notEmpty(),
    check("checkout","La hora de salida es obligatoria").notEmpty(),
    check("type","El tipo debe de ser un numero").isNumeric(),
    validarCampos  
],postEntry) 

//listar por holder
router.get("/holder/:id",[
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperEntry.validarIdHolder),
    validarCampos
], getlistarPorHolder)

//listar por dia
router.get("/:dia",[
    check("dia","La fecha no es valida").isDate(),
    check("dia","La fecha no existe").custom(helperEntry.validarDia),
    validarCampos
], getListarPorDia)

//listar por fechas
router.get("/fechas/:fechaInicio/:fechaFinal",[
    check("fechaInicio","La fecha no es valida").isDate(),
    check("fechaFinal","La fecha no es valida").isDate(),
    check("fechaInicio","La fecha no existe").custom(helperEntry.validarFechas),
    check("fechaFinal","La fecha no existe").custom(helperEntry.validarFechas),
    validarCampos
], getListarPorFechas)

//entrada o salida
router.put("/:salida?",[
    check("salida","debe ingresar 1 si es entrada o 0 si es salida").notEmpty(),
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperEntry.putValidarIdHolder),
    validarCampos
], putEntradaSalida)

module.exports=router