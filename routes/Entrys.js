const {Router} = require ("express")
const {postEntry, getlistarPorHolder, getListarPorDia, getListarPorFechas, putEntradaSalida} = require ("../controllers/Entrys")
const router = Router()


//insertar
router.post("/", postEntry)

//listar por holder
router.get("/holder/:id", getlistarPorHolder)

//listar por dia
router.get("/:dia", getListarPorDia)

//listar por fechas
router.get("/fechas/:fechaInicio/:fechaFinal", getListarPorFechas)

//entrada o salida
router.put("/:salida", putEntradaSalida)

module.exports=router