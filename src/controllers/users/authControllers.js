import User from '../../models/users/userModels.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { first_name , last_name , doc_id , phone , address , email , username , password } = req.body;
    const user = new User({
        first_name,
        last_name,
        doc_id,
        phone,
        address,
        email,
        username,
        password
    });
    try {
        await user.save();
        res.status(201).json({
            message: 'Usuario creado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el usuario'
        });
    }
} 

export const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                message: 'Usuario no encontrado'
            });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Usuario autenticado',
            token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al autenticar el usuario'
        });
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