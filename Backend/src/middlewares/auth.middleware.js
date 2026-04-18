import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {

    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); 
    } catch (error) {
        res.status(400).json({ mensaje: 'El token no es válido o ha expirado' });
    }
};

export default verifyToken;