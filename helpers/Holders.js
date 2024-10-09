const Holder = require('../models/Holders');

const helperHolder={
    validarEmail:async (email)=>{
        const existe=await Holder.find({email})
        if(existe){
            throw new Error ("el email ya existe")
        }
    },

    validarDocument:async (document)=>{
        const existe=await Holder.find({document})
        if(existe){
            throw new Error ("el documento ya existe")
        }
    },

    validarFicha:async (ficha)=>{
        const existe=await Holder.find({ficha})
        if(existe){
            throw new Error ("la ficha ya existe")
        }
    },

    validarContraseña:async (password)=>{

        const existe=await Holder.find({password})
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