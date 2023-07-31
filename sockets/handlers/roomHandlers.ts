import { PrismaClient, User } from "@prisma/client";

const db = new PrismaClient();

export const connectRoom = async (socket: any, io: any) => {
  const { roomId } = socket.handshake.query;

  const groupId = await db.group.findUnique({
    where: {
      id: roomId,
    },
  });
  if (!groupId) {
    socket.broadcast.emit("Error", "No group with matched id");
  } else {
    socket.join(roomId);
  }
};

export const createRoom = async (socket: any, io: any) => {
  socket.on("create-room", async (users?: { userId: number }[]) => {
    const group = await db.group.create({
      data: {},
      select: {
        id: true,
      },
    });
    if (Array.isArray(users)) {
      const userIds = users.map((user) => user.userId);

      await db.userGroup.createMany({
        data: userIds.map((userId) => ({
          userId,
          groupId: group.id,
        })),
      });
    }
    socket.emit("created-room", "Room has been created");
    socket.broadcast.emit("created-room", "Room has been created");
  });
};

export const leaveRoom = async (socket: any, roomId: string) => {
  await socket.leave(roomId);
};
