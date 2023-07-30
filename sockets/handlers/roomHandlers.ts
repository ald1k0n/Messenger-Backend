import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectRoom = async (socket: any, roomId: number) => {
  const room = await prisma.user.findUnique({
    where: {
      id: roomId,
    },
    select: {
      id: true,
    },
  });

  if (room?.id) {
    await socket.join(room?.id);
  } else {
    throw new Error("Specified User is not registered");
  }
};

export const leaveRoom = async (socket: any, roomId: string) => {
  await socket.leave(roomId);
};
