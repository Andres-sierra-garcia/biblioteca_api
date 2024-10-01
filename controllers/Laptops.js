const Laptops = require("../models/Laptops");
const qrCodigo = require("qrcode")


const postInsertar = async (req, res)=>{
    try {
        const {holder, serial, qrcode, state, observations} = req.body;
        const laptop = new Laptops({holder, serial, qrcode, state, observations});
        await laptop.save()
        res.json({laptop})
    } catch (error) {
        res.status(400).json({error:"operacion ha fallado"})
        console.log(error);
    }
}


const putModificar= async (req,res)=>{
    try {
        const {id}= req.params
        const {holder, serial, qrcode, state, observations} = req.body;
        const laptop = await Laptops.findByIdAndUpdate(id,{holder, serial, qrcode, state, observations},{new:true});
        res.json({laptop})
    } catch (error) {
        res.status(400).json({error:"operacion ha fallado"})
        console.log(error);
    }
}


const getListar = async (req, res)=>{
    try {
        const laptops= await Laptops.find();
        res.json({laptops})
    } catch (error) {
        res.status(400).json({error:"operacion ha fallado"})
        console.log(error);
    }
}




const getListarPorId = async (req, res)=>{
    try {
        const {id} = req.params
        const laptops= await Laptops.findById(id)
        res.json({laptops})
    } catch (error) {
        res.status(400).json({error:"operacion ha fallado"})
        console.log(error);
    }
}


const putActivar = async (req, res)=>{
    try {
        const {id}= req.params;
        const laptop = await Laptops.findByIdAndUpdate(id,{state:1},{new: true})
        res.json({laptop});
    } catch (error) {
        res.status(400).json({error:"operacion ha fallado"})
        console.log(error);
    }
}

const putDesactivar = async (req, res)=>{
    try {
        const {id}= req.params;
        const laptop = await Laptops.findByIdAndUpdate(id,{state:0},{new: true})
        res.json({laptop});
    } catch (error) {
        res.status(400).json({error:"operacion ha fallado"})
        console.log(error);
    }
}

const generarQr= async (req, res)=> {
    try {
        const {serial} = req.params;
        const QRCodigo = await qrCodigo.toDataURL(serial);
        const laptop = await Laptops.findOneAndUpdate({serial},{qrcode:QRCodigo},{ new:true})
        res.json({laptop})
    } catch (error) {
         res.status(400).json({error:"operacion fallo"})
        console.log(error);
    }
}

module.exports = {postInsertar, putModificar, getListar, getListarPorId, putActivar, putDesactivar, generarQr}