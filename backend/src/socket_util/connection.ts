import { Socket } from "socket.io";

const connection = (
  socket: Socket,
  userMap: Map<string, string>,
  io: any
): void => {
  const userId = (socket as any).userId;

  if (userId) {
    userMap.set(userId, socket.id);
  }
};

export default connection;
