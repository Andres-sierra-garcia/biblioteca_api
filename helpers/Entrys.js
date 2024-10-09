const Entry = require ('../models/Entrys');

const helperEntry ={
  
    validarIdHolder:async (id)=>{
        const holder =await Entry.find({id});
        if(!holder){
            throw new Error ("el id no existe")
        }
    },
    validarDia:async (dia)=>{
        const startOfDay = new Date(dia);
        const endOfDay = new Date(dia);
        endOfDay.setDate(endOfDay.getDate() + 1);
        const fecha = await Entry.find({
            entrytime: { $gte: startOfDay, $lt: endOfDay }
        });
        if(fecha.length == 0){
            throw new Error ("la fecha "+fecha+" no existe")
        }
    },

    validarFechas:async (value,{req})=>{
        const{fechaInicio, fechaFinal}= req.params
        const startOfDay = new Date(fechaInicio);
        const endOfDay = new Date(fechaFinal);
        endOfDay.setDate(endOfDay.getDate() + 1);
        const fechas = await Entry.find({
            entrytime: { $gte: startOfDay, $lt: endOfDay }
        });
        if(fechas.length == 0){
            throw new Error ("no existen entradas entre las fechas " + fechaInicio)
        }
    },

    putValidarIdHolder:async (id)=>{
        const entry = await Entry.findById(id);
        if (!entry) {
            throw new Error("el id:"+ id + "no existe");
        }
    }
};

module.exports={helperEntry}