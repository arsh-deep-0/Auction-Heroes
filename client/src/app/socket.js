import { io } from "socket.io-client";
import Cookies from "universal-cookie";
const URL = process.env.SOCKET_URL;
const cookies = new Cookies(null, { path: "/" });
const token = cookies.get("accessTokenID");

export const socket = io(URL, {
  query: {
    accessToken: token,
  },
  autoConnect: false,
  withCredentials: true,
});
