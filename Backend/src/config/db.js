import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI);
        console.log(`[MongoDB] Conectado exitosamente: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[MongoDB] Error de conexión: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;