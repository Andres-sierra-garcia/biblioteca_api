const Holders = require("../models/Holders");

const postHolders = async (req, res) => {
    try {
        const { email, password, document, name, rol, ficha, photo, phone, state } =
            req.body;
        const holder = new Holders({
            email,
            password, 
            document,
            name,
            rol,
            ficha,
            photo,
            phone,
            state,
        });
        await holder.save();
        res.json({ holder });
    } catch (error) {
        res.status(400).json({ error: "operacion fallo" });
        console.log(error);
    }
};



const putHolders = async (req, res) =>{
    try {
        const {id} = req.params
        const {email, password, document, name, rol, ficha, photo, phone, state} = req.body
        const holder = await Holders.findByIdAndUpdate(id, {
            email,
            password,
            document,
            name,
            rol,
            ficha,
            photo,
            phone,
            state
        },{new: true});
        res.json({holder})
    } catch (error) {
        res.status(400).json({error: "Los datos  no han sido modificados correctamente"})
        console.log(error);
    }
}


const getHolder = async (req , res) =>{

    try {
        const {id} = req.params;
        const holder= await Holders.findById(id);
        res.json({holder})
    } catch (error) {
        res.status(400).json({error: "Parecec que hubo un fallo en la  operacion , mera weba"})
        console.log(error);
    }

}



const getHolders = async (req , res) =>{

    try {
        const holder = await Holders.find();
        res.json({holder})
    } catch (error) {
        res.status(400).json({error: "Parecec que hubo un fallo en la  operacion , mera weba"})
        console.log(error);
    }
}


const putActive = async (req, res)=>{
    try {
        const {id} = req.params
        const holder = await Holders.findByIdAndUpdate(id,{state:1},{new:true});
        res.json({holder});
    } catch (error) {
        res.status(400).json({error : "la operacion ha fallado"});
        console.log(error);
    }
}

const putUnactivate = async (req, res)=>{
    try {
        const {id} = req.params
        const holder = await Holders.findByIdAndUpdate(id,{state:0},{new:true});
        res.json({holder});
    } catch (error) {
        res.status(400).json({error : "la operacion ha fallado"});
        console.log(error);
    }
}



module.exports={postHolders, putHolders, getHolder, getHolders, putActive, putUnactivate}
