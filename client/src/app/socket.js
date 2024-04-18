import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const URL = process.env.SOCKET_URL;

export const socket = io(URL, {
  query: {
    accessToken: 'your_access_token_here'
  },
  autoConnect: false,
  withCredentials: true,
});
