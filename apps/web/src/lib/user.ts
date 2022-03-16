import { Unpacked } from "@joga-bonito/types";
import { Prisma, Vote } from "@prisma/client";
import prisma from "./prisma";

export type UserWithVotes = Unpacked<Prisma.PromiseReturnType<typeof getUsers>>;

export const getUsers = async () =>
  await prisma.user.findMany({
    include: {
      votes: true,
    },
  });

export const getUser = async (id: string) =>
  await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      votes: true,
    },
  });

export const updateUserAndVotes = async (user: UserWithVotes, updatedToUser: UserWithVotes) => {
  const { votes: updatedVotes, ...updatedUser } = updatedToUser;
  const { votes: oldVotes, ...oldUser } = user;

  const votesToCreate = (updatedVotes ?? []).filter((a: Vote) => !oldVotes.some((b) => a.dateVoted === b.dateVoted));

  await prisma.user.update({
    data: {
      ...oldUser,
      ...updatedUser,
      votes: {
        createMany: {
          data: votesToCreate.map((vote) => ({
            dateVoted: vote.dateVoted,
            weekNumberVoted: vote.weekNumberVoted,
            cageballEventId: vote.cageballEventId,
            updatedAt: new Date(),
            createdAt: new Date(),
          })),
        },
        deleteMany: {
          dateVoted: {
            notIn: updatedVotes.map((vote) => vote.dateVoted),
          },
          userId: user.id,
        },
      },
    },
    where: {
      id: user.id,
    },
  });
};
