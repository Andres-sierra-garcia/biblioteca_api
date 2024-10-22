const Holders = require("../models/Holders");
const generarJWT = require("../middlewares/validar_jwt");
const bcrypt = require('bcrypt');

const postHolders = async (req, res) => {
    try {
        const { email, password, document, name, rol, ficha, photo, phone, state } =
            req.body;
        const encryptedPassword = bcrypt.hashSync(password, 10);
        const holder = new Holders({
            email,
            password:encryptedPassword,
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

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const holder = await Holders.findOne({email});
        console.log(holder);
        
        if (!holder) {
            return res.status(400).json({ msg: "Holder / email incorrecto"});
        }
        if (holder.state === "0") {
            return res.status(400).json({
                msg: "Holder inactivo",
            });
        }
        const validPassword = bcrypt.compareSync(password, holder.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Holder / password incorrectos",
            });
        } 
        const token = await generarJWT.generarJWT(holder._id);
        res.json({
            holder,
            token,
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ msg: "algo salio mal hable con el webMaster" });
    }
};



const putHolders = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, document, name, rol, ficha, photo, phone, state } =
            req.body;
        const holder = await Holders.findByIdAndUpdate(
            id,
            {
                email,
                password,
                document,
                name,
                rol,
                ficha,
                photo,
                phone,
                state,
            },
            { new: true }
        );
        res.json({ holder });
    } catch (error) {
        res
            .status(400)
            .json({ error: "Los datos  no han sido modificados correctamente" });
        console.log(error);
    }
};

const getHolder = async (req, res) => {
    try {
        const { id } = req.params;
        const holder = await Holders.findById(id);
        res.json({ holder });
    } catch (error) {
        res
            .status(400)
            .json({ error: "Parecec que hubo un fallo en la  operacion" });
        console.log(error);
    }
};

const getHolders = async (req, res) => {
    try {
        const holder = await Holders.find();
        res.json({ holder });
    } catch (error) {
        res
            .status(400)
            .json({
                error: "Parecec que hubo un fallo en la  operacion , mera weba",
            });
        console.log(error);
    }
};

const putActive = async (req, res) => {
    try {
        const { id } = req.params;
        const holder = await Holders.findByIdAndUpdate(
            id,
            { state: 1 },
            { new: true }
        );
        res.json({ holder });
    } catch (error) {
        res.status(400).json({ error: "la operacion ha fallado" });
        console.log(error);
    }
};

const putUnactivate = async (req, res) => {
    try {
        const { id } = req.params;
        const holder = await Holders.findByIdAndUpdate(
            id,
            { state: 0 },
            { new: true }
        );
        res.json({ holder });
    } catch (error) {
        res.status(400).json({ error: "la operacion ha fallado" });
        console.log(error);
    }
};

module.exports = {
    postHolders,
    postLogin,
    putHolders,
    getHolder,
    getHolders,
    putActive,
    putUnactivate,
};
