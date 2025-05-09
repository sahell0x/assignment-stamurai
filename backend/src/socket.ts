import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import disconnection from "./socket_util/disconnection";
import connection from "./socket_util/connection";
import socketAuthMiddleware from "./socket_util/socketAuthMiddleware";

const socketSetup = (server: Server) => {
  const io: SocketServer = new SocketServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  io.use(socketAuthMiddleware);

  io.on("connection", (socket: any) => {
    connection(socket, userSocketMap, io);

    socket.on("assigned", (task:any) => {
        const receiver = task?.assignedTo;
        const recieverSocketId = userSocketMap.get(receiver);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("assigned",task);
        }
    });

    socket.on("update-task", (updatedTask:any) => {
        const receiver = updatedTask?.assignedTo;
        const recieverSocketId = userSocketMap.get(receiver);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("update-task",updatedTask);
        }
    });

    socket.on("status-update", (data:any) => {
        const receiver = data?.eventFor;
        const recieverSocketId = userSocketMap.get(receiver);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("update-task",data);
        }
    });

    socket.on("delete-task", (data:any) => {
        const receiver = data?.assignedTo;
        const recieverSocketId = userSocketMap.get(receiver);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("delete-task",data);
        }
    });

    socket.on("disconnect", () => {
      disconnection(socket, userSocketMap, io);
    });
  });
};

export default socketSetup;
