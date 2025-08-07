import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_API_URL || "https://sde-intern-resources-node-io-api.vaacdq.easypanel.host"
);
