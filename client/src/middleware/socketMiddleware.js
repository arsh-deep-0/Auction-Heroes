// middleware/socketMiddleware.js
import { initWebSocket } from "@/lib/initWebSocket";
import { socket } from "../app/socket";
import { eventTypes } from "@/constants/eventTypes";

const socketMiddleware = (store) => {
 
  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
    // Initialize WebSocket connection once connected
    store.dispatch(initWebSocket(store, socket));
  });

  return (next) => (action) => {
    if (!action) {
      return;
    }

    // Extract all message types from the messageTypes object

    const websocketActionTypes = Object.values(eventTypes);

    console.log('gen action',action)
    // Check if the current action type is in the array of websocketActionTypes
    if (websocketActionTypes.includes(action.type)) {
      console.log('socket action:',action);
      // Emit WebSocket messages for specific actions
      const { type, payload } = action;
      socket.emit(type, payload);
      console.log("emiited");
    } else {
      // Pass actions through if they don't involve WebSocket communication
      return next(action);
    }
  };
};

export default socketMiddleware;
