import { io } from "socket.io-client";
import { HOST } from "./utils/constant";
const socket = io(HOST, {
  withCredentials: true
});

export default socket;