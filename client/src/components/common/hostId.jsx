import axios from "axios";

async function getHostID(waitingRoomID) {
  try {
    const response = await axios.get(`/api/auctions/getHost/${waitingRoomID}`,{withCredentials:true});
    console.log(response)
    return response.data.data.host;
  } catch (error) {
    console.error("Error fetching host ID:", error);
    return null;
  }
}

export default getHostID;
