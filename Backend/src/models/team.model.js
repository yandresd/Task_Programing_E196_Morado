import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        trim: true 
    },
    description: { 
        type: String 
    },
    members: [{
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        role: { 
            type: String, 
            enum: ['owner', 'lider', 'miembro'], 
            default: 'miembro' 
        }
    }]
}, { timestamps: true });

export default model('Team', teamSchema);