import User from '../models/user.model.js';
import { genSalt, hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 1. REGISTRAR UN NUEVO USUARIO
const register = async (req, res) => {
    try {
        const { name, email, password} = req.body;

        // Verificamos si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ mesage: 'El correo ya está registrado' });
        }

        // Encriptamos la contraseña
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        // Creamos el usuario con la contraseña encriptada
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ status: 'success', mesage: 'Usuario registrado exitosamente' });

    } catch (error) {
        res.status(500).json({ status: 'error', mesage: 'Error al registrar usuario', error: error.message });
    }
};

// 2. INICIAR SESIÓN (LOGIN)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscamos al usuario por su correo
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ mesage: 'Credenciales inválidas (correo)' });
        }
        console.log("1");
        // Comparamos la contraseña enviada con la encriptada en la base de datos
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ mesage: 'Credenciales inválidas (contraseña)' });
        }
        console.log(user);
        // Si todo está bien, creamos el Token JWT
        const token = jwt.sign(
            { id: user._id },
              process.env.JWT_KEY,
            { expiresIn: '48h' }
        );
        console.log("3");
        // Devolvemos el token y los datos básicos del usuario
        res.status(200).json({
            status: 'success',
            mesage: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ status: 'error', mesage: 'Error al iniciar sesión', error: error.message });
    }
};

// 2. VERIFICAR (VERIFY)
const verification = async (req, res) => {
    try {
        const { token } = req.body;

        jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
            if (err) {
                err = {
                    status: 'error',
                    name: 'JsonWebTokenError',
                    message: 'jwt malformed'
                }
            }
        });

    } catch (error) {
        res.status(500).json({ status: 'error', mesage: 'Error al iniciar sesión', error: error.message });
    }
};

export { register, login };