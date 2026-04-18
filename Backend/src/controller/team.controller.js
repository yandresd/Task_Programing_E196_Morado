import Team from '../models/team.model.js';

// Crear un nuevo equipo
const createTeam = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        const userId = req.user.id; 

        const newTeam = new Team({
            name,
            description,
            members: [{
                user: userId,
                role: 'owner'
            }]
        });

        await newTeam.save();
        res.status(201).json({ mensaje: 'Equipo creado exitosamente', team: newTeam });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el equipo', error: error.message });
    }
};

export { createTeam };