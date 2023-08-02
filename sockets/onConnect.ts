import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const onConnect = async (
  socket: any,
  io: any,
  socketId: string,
  currentId: any
) => {
  console.log(currentId);
  if (!Array.isArray(currentId)) {
    await db.user.update({
      where: {
        id: currentId.userId,
      },
      data: {
        socketId,
      },
    });
  }
  console.log(currentId);

  socket.broadcast.emit(socketId, "Connected to messenger");
};
