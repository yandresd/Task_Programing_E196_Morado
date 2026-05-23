import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {

    const authToken = req.header('accesstoken');
    
    if (!authToken) {
        return res.status(401).json({ mesage: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        const verified = jwt.verify(authToken, process.env.JWT_KEY);
        req.user = verified;
        next(); 
    } catch (error) {
        res.status(400).json({ status:"error", mesage: 'El token no es válido o ha expirado' });
    }
};

export default verifyToken;