import { Socket } from "socket.io";

const disconnection = (
  socket: Socket,
  userMap: Map<string, string>,
  io: any
): void => {

  const userId = (socket as any).userId;

  if (userId) {
    userMap.delete(userId);
  }
};

export default disconnection;
