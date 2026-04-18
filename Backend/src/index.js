import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import teamRoutes from './routes/team.routes.js';

const app = express();

connectDB();

app.use(cors());
app.use(json());

// Ruta de prueba (Endpoint base)
app.get('/', (req, res) => {
    res.json({ mensaje: '¡Servidor Express funcionando correctamente!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`[Express] Servidor corriendo en http://localhost:${PORT}`);
});