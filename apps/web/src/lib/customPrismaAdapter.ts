import type { Prisma, PrismaClient } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";

// Implemented to solve [next-auth][error][CALLBACK_EMAIL_ERROR]
// name: DeleteSessionError
// code: P2025
// message: An operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.
export function CustomPrismaAdapter(p: PrismaClient): Adapter {
  return {
    createUser: (data) => p.user.create({ data }),
    getUser: (id) => p.user.findUnique({ where: { id } }),
    getUserByEmail: (email) => p.user.findUnique({ where: { email } }),
    async getUserByAccount(provider_providerAccountId) {
      const account = await p.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true },
      });
      return account?.user ?? null;
    },
    updateUser: (data) => p.user.update({ where: { id: data.id }, data }),
    deleteUser: (id) => p.user.delete({ where: { id } }),
    linkAccount: (data) => p.account.create({ data }) as any,
    unlinkAccount: (provider_providerAccountId) => p.account.delete({ where: { provider_providerAccountId } }) as any,
    async getSessionAndUser(sessionToken) {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });
      if (!userAndSession) return null;
      const { user, ...session } = userAndSession;
      return { user, session };
    },
    createSession: (data) => p.session.create({ data }),
    updateSession: (data) => p.session.update({ data, where: { sessionToken: data.sessionToken } }),
    async deleteSession(sessionToken) {
      try {
        return await p.session.delete({ where: { sessionToken } });
      } catch (error) {
        // If session already deleted, just return null
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025") return null;
        throw error;
      }
    },
    createVerificationToken: (data) => p.verificationToken.create({ data }),
    async useVerificationToken(identifier_token) {
      try {
        return await p.verificationToken.delete({ where: { identifier_token } });
      } catch (error) {
        // If token already used/deleted, just return null
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025") return null;
        throw error;
      }
    },
  };
}
