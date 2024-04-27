import axios from "axios";

async function createOfflineTeams(roomID) {
  

  const avatars = [
    "MI",
    "CSK",
    "RCB",
    "SRH",
    "PBKS",
     "RR",
    "KKR",
    "GT",
    "DC",
    "LSG",
    "KT",
    "DD",
    "GL",
    "RPS",
    "PW",
    "DeC"
  ];

  let order = 1;
  avatars.forEach(async (user) => {
    try {
      const team = {
        teamName: avatars[order - 1],
        teamLogo: avatars[order - 1],
        initialPurse: 50,
        currentPurse: 50,
        auctionRoomID: roomID,
        currentPlayerCount: 0,
        isComplete: false,
        teamPoints: 0,
        order: order++,
        playersBoughtCount: 0,
      };

      const teamRes = await axios.post(`/api/teams/create`, team);
      console.log("createdTeam:", teamRes.data);
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

export default createOfflineTeams;
