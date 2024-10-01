const {Router} = require("express")
const {postInsertar, putModificar, getListar, getListarPorId, putActivar, putDesactivar, generarQr} = require("../controllers/Laptops")
const router = Router()

//insertar
router.post("/",postInsertar)


//modificar
router.put("/:id", putModificar)

//listar
router.get("/",getListar)


//listar pot id
router.get("/:id", getListarPorId )

//activar
router.put("/activate/:id", putActivar )

//desactivar
router.put("/unactivate/:id", putDesactivar)

//codigo qr
router.put("/qr/:serial", generarQr)

module.exports=router  