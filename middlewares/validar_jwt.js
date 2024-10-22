const jwt = require ('jsonwebtoken')
const Holders = require ('../models/Holders')

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "4h",
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("no se pudo generar el token");
                } else {
                    resolve(token);
                }
            }
        );
    });
}


const validarJWT = async (req, res, next)=>{
    const token = req.header("x-token");
    if(!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        let user = await Holders.findById(uid)
        if(!user){
            return res.status(401).json({
                msg:"Token no valido - usuario no existe"
            })
        }
        if(!user.state){
            return res.status(401).json({
                msg:"Token no valido - usuario inactivo"
            })
        }
        next()

    } catch (error) {
        res.status(401).json({
            msg:"Token no valido"
        })
    }
}


module.exports={generarJWT, validarJWT}
