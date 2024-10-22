const Holder = require('../models/Holders');

const helperHolder={
    validarEmail:async (email)=>{
        const existe=await Holder.findOne({email})
        if(existe){
            throw new Error ("el email ya existe" + email)
        }
    },

    validarDocument:async (document)=>{
        const existe=await Holder.findOne({document})
        if(existe){
            throw new Error ("el documento ya existe")
        }
    },

    validarFicha:async (ficha)=>{
        const existe=await Holder.findOne({ficha})
        if(existe){
            throw new Error ("la ficha ya existe")
        }
    },

    validarContraseña:async (password)=>{

        const existe=await Holder.findOne({password})
        if(existe){
            throw new Error ("la contraseña ya existe")
        }
    },

    validarId:async (id)=>{
        const existe=await Holder.findById(id)
        if(!existe){
            throw new Error ("el id no existe")
        }
    },


}


module.exports={helperHolder}