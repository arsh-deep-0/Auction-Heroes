import axios from "axios";

async function createTeams({ users, roomID }) {
  console.log("state: ", users);
  
  let order=0
  users.users.forEach(async (user) => {
    try {
      const res = await axios.get(`/api/users/getFullName/${user.userID}`);
      console.log("fullname: ", res.data);
      
      const team = {
        teamName: res.data.data.userName,
        teamLogo: "csk",
        initialPurse: 50,
        currentPurse: 50,
        auctionRoomID: roomID,
        currentPlayerCount: 0,
        isComplete: false,
        teamPoints: 0,
        order:order++,
        playersBoughtCount:0
      };
            
      const teamRes = await axios.post(`/api/teams/create`, team);
      console.log("createdTeam:", teamRes.data);
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

export default createTeams;
