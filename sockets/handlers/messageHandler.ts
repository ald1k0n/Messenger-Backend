import { IMessage } from "../../types";

export const sendMessage = async (socket: any, io: any) => {
  socket.on("send-message", (messageObj: IMessage, room: string) => {
    if (room === "") return;
    else {
      socket.to(room).emit("receive-message", messageObj);
    }
  });
};
