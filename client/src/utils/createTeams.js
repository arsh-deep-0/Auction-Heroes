import axios from "axios";

async function createTeams({ users, roomID }) {
  console.log("state: ", users);

  const avatars =['host','mi','csk','rcb','srh','pbks','rr','kkr','gt','dc','lsg']
  
  let order=1
  users.users.forEach(async (user) => {
    try {
      const res = await axios.get(`/api/users/getFullName/${user.userID}`);
      console.log("fullname: ", res.data);
      
      const team = {
        teamName: res.data.data.userName,
        teamLogo: avatars[order-1],
        initialPurse: 50,
        currentPurse: 50,
        auctionRoomID: roomID,
        currentPlayerCount: 0,
        isComplete: false,
        teamPoints: 0,
        order:order++,
        playersBoughtCount:0,
        userID:user.userID
      };
            
      const teamRes = await axios.post(`/api/teams/create`, team);
      console.log("createdTeam:", teamRes.data);
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

export default createTeams;
