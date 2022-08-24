import User from '../../models/users/userModels.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { first_name, last_name, doc_id, phone, address, email, username, password } = req.body;
    const user = new User({first_name, last_name, doc_id, phone, address, email, username, password });
    try {
        await user.save();
        res.status(201).send({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(400).send(error);
    }
}

export const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send({ message: 'Usuario no encontrado' });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.status(200).send({ token });
    } catch (error) {
        
    }
}

export const recover = async (req, res) => {
    console.log(req.body);
    console.log('recover recuperar contraseña');
}

export const change = async (req, res) => {
    console.log(req.body);
    console.log('change cambiar contraseña');
}