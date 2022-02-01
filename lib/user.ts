import { Unpacked } from "@/types";
import { Prisma } from "@prisma/client";
import prisma from "./prisma";

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

export type UserWithVotes = Unpacked<Prisma.PromiseReturnType<typeof getUsers>>;
