const Entrys = require("../models/Entrys")


const postEntry = async (req, res)=>{
    try {
        const {laptop, entrytime, checkout, type} = req.body;
        const entry = new Entrys({laptop, entrytime, checkout, type});
        await entry.save()
        res.json({entry})
    } catch (error) {
        res.status(400).json({error:"la operacion ha fallado"})
        console.log(error);
    }
}



const getlistarPorHolder = async (req,res)=>{
    try {
        const {id} = req.params;
        const entry = await Entrys.find({laptop:id});
        res.json({entry});
    } catch (error) {
        res.status(400).json({error:"la operacion ha fallado"})
        console.log(error);
    }
}



const getListarPorDia = async (req, res)=>{
    try {
        const {dia} = req.params;
        const startOfDay = new Date(dia);
        const endOfDay = new Date(dia);
        endOfDay.setDate(endOfDay.getDate() + 1);
        const entry = await Entrys.find({
            entrytime: { $gte: startOfDay, $lt: endOfDay }
        });
        res.json({entry})
    } catch (error) {
        res.status(400).json({error :"la  operacion ha fallado"})
        console.log(error);
}
}



const getListarPorFechas = async (req, res)=>{
    try {
        const {fechaInicio, fechaFinal} = req.params
        const fecha1 = new Date (fechaInicio);
        const fecha2 = new Date (fechaFinal);
        const entrys = await Entrys.find({
            entrytime: { $gte: fecha1, $lt: fecha2 }
        });
        res.json({entrys})
    } catch (error) {
        res.status(400).json({error :"la  operacion fallo"})
        console.log(error);

}
}

const putEntradaSalida = async (req, res)=>{
    try {
        const {salida} = req.params;
        const {id} = req.body;
        const {laptop, entrytime, checkout, type} = req.body;
        const entry= await Entrys.findByIdAndUpdate(id,{type:salida},{ new: true})
        res.json({entry})
    } catch (error) {
        res.status(400).json({error:"la operacion no se realizo correctamente"})
    }
}

module.exports={postEntry, getlistarPorHolder, getListarPorDia, getListarPorFechas, putEntradaSalida}


