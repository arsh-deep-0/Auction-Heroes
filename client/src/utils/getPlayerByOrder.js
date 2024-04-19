import axios from "axios";

async function getPlayerByOrder(order) {
  try {
    const res = await axios.get(`/api/players/get/${order}`);
    console.log('res:',res);
    const player = res.data.data;
    console.log("player: ", player);
    return player;
  } catch (error) {
    console.log("error while getting teams", error);
  }
}

export default getPlayerByOrder;
