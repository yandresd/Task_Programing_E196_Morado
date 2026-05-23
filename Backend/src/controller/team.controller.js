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
        res.status(201).json({ status: 'success', mesage: 'Equipo creado exitosamente', team: newTeam });

    } catch (error) {
        res.status(500).json({ status: 'error', mesage: 'Error al crear el equipo', error: error.message });
    }
};

// Crear un nuevo equipo
const searchTeams = async (req, res) => {
    try {
        
        const userId = req.user.id; 

        const teamsOwned = await Team.find({
            members: {
                $elemMatch: {
                    user: userId,
                    role: 'owner'
                }
            }
        });

        const teamsBelong = await Team.find({
            members: {
                $elemMatch: {
                    user: userId,
                    role:{$ne: 'owner'} 
                }
            }
        });

        res.status(200).json({ status: 'success', mesage: 'Equipos encontrados', teamsOwned: teamsOwned, teamsBelong: teamsBelong });

    } catch (error) {
        res.status(500).json({ status: 'error', mesage: 'Error al consultar equipos', error: error.message });
    }
};

// Crear un nuevo equipo
const addMember = async (req, res) => {
    try {
        
        const userId = req.user.id;
        const teamId = req.body.teamId;
        const {newMemberId, role} = req.body;


        const team = await Team.findId({teamId});
        if(!team){
            return res.status(404).json({ status: 'error', message: 'Equipo no encontrado' });
        }

        const isMember = await Team.members.some((member)=> {member.user.toStrion() === newMemberId});
        if(isMember){
            return res.status(404).json({ status: 'error', message: 'Este usuario ya es miembro' });
        }

        team.members.push({
            user: userId,
            role: role || 'Member'
        });

        await team.save()

        res.status(200).json({ status: 'success', mesage: 'Miembro agregado exitosamente'});

    } catch (error) {
        res.status(500).json({ status: 'error', mesage: 'Error al consultar equipos', error: error.message });
    }
};

export { createTeam, searchTeams };