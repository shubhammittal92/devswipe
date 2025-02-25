import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  // Determine the WebSocket URL based on the environment
  const socketUrl = location.hostname === "localhost" ? BASE_URL : "https://devtinder-4-xzbi.onrender.com";

  // Connect to the Socket.IO server
  return io(socketUrl, {
    path: "/api/socket.io", // Ensure this matches your backend configuration
    transports: ["websocket"], // Use WebSocket only (optional)
  });
};