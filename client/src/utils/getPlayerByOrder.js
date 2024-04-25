import axios from "axios";


async function getPlayerByOrder(order,roomID) {
  try {
   
    const res = await axios.get(`/api/players/get/${order}/${roomID}`);
    console.log('res:',res);
    const player = res.data.data;
    console.log("player: ", player);
    return player;
  } catch (error) {
    console.log("error while getting teams", error);
  }
}

export default getPlayerByOrder;
