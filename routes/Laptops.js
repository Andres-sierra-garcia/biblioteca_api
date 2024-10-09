const {Router} = require("express")
const {postInsertar, putModificar, getListar, getListarPorId, putActivar, putDesactivar, generarQr} = require("../controllers/Laptops")
const {helperLaptop}= require ('../helpers/Laptops')
const {validarCampos} = require('../middlewares/validarCampos');
const {check} = require('express-validator');
const router = Router()

//insertar
router.post("/",[
    check("serial","El serial es obligatorio").notEmpty(),
    check("holder","El id del holder es obligatorio").notEmpty(),
    check("holder","El id del holder no es valido").isMongoId(),
    check("state","El estado es obligatorio").notEmpty(),
    check("state","El estado debe de ser un numero").isNumeric(),
    validarCampos
],postInsertar)


//modificar
router.put("/:id",[
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperLaptop.validarId)
    ,validarCampos
], putModificar)

//listar
router.get("/",getListar)


//listar pot id
router.get("/:id",[
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperLaptop.validarId),
    validarCampos
], getListarPorId )

//activar
router.put("/activate/:id",[
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperLaptop.validarId),
    validarCampos
], putActivar )

//desactivar
router.put("/unactivate/:id",[
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperLaptop.validarId),
    validarCampos
], putDesactivar)

//codigo qr
router.put("/qr/:Serial",[
    check("Serial","El serial no es valido").notEmpty(),
    check("Serial","El serial no existe").custom(helperLaptop.validarSerial),
    validarCampos
], generarQr)

module.exports=router  