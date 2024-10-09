const Laptops = require('../models/Laptops');

const helperLaptop={

    validarId: async (id)=>{
        const holder = await Laptops.findById(id);    
        if(!holder){
            throw new Error ("el id:"+ id + " no existe");
        }
    },

    validarSerial:async (serial)=>{
        const Serial=await Laptops.find({serial:serial})
        if(Serial.length == 0){
            throw new Error ("el serial no existe")
        }
    }

}

module.exports={helperLaptop}