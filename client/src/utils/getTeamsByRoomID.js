import axios from "axios";

async function  getAllTeamsByRoomID(roomID){
    try {
        const res = await axios.get(`/api/teams/getAllTeams/${roomID}`)
        const  allTeams = res.data.data;
        console.log('teams',allTeams);
        return allTeams;
    } catch (error) {
        console.log('error while getting teams',error)
    }
 }
 
 export default getAllTeamsByRoomID