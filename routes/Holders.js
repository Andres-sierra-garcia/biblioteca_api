const {Router} = require('express')
const {postHolders, putHolders, getHolders, getHolder, putActive, putUnactivate} = require("../controllers/Holders")
const router= Router();

//insertar 
router.post("/", postHolders)


//actualizar o modificar
router.put("/:id",putHolders)


//listar por id
router.get("/:id", getHolder)

// listar todos
router.get("/", getHolders)

//activar
router.put("/activate/:id", putActive)

//inactivar
router.put("/unactivate/:id", putUnactivate)

module.exports=router