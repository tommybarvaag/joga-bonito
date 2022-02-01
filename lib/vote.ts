import { Unpacked } from "@/types";
import { Prisma } from "@prisma/client";
import prisma from "./prisma";

export type VoteWithUser = Unpacked<Prisma.PromiseReturnType<typeof getVotes>>;

export const getVotes = async () =>
  await prisma.vote.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

export const getVote = async (id: string) =>
  await prisma.vote.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

export const getVotesForWeekNumber = async (weekNumber: number) =>
  await prisma.vote.findMany({
    where: {
      weekNumberVoted: weekNumber,
    },
    include: {
      user: true,
    },
  });
