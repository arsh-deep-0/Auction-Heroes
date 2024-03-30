import { io } from 'socket.io-client';

const URL = process.env.SOCKET_URL

export const socket = io(URL, {
    autoConnect: false
  });