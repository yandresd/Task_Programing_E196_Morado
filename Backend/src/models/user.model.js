import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: false },
}, { timestamps: true });

export default model('User', userSchema);