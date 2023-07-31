import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const onConnect = async (
  socket: any,
  io: any,
  socketId: string,
  currentId: any
) => {
  console.log(currentId);
  await db.user.update({
    where: {
      id: currentId.currentUserId,
    },
    data: {
      socketId,
    },
  });

  socket.broadcast.emit(socketId, "Connected to messenger");
};
