import { socketServerEvents } from "@/constants/socketServerEvents";

export const initWebSocket = (store, socket) => {
  console.log("socketServerEvents: ", socketServerEvents);
  Object.values(socketServerEvents).forEach((eventType) => {
    socket.on(eventType, (payload) => {
      console.log("Received event:", eventType);
      store.dispatch({ type: eventType, payload });
    });
  });
};
