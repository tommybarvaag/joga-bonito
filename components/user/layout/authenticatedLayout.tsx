import { UserProvider } from "@/components/user";
import { VoteProvider } from "@/components/vote";
import { SessionProvider } from "next-auth/react";

const AuthenticatedLayout = ({ children, pageProps }: { children: React.ReactNode; pageProps: any }) => {
  return (
    <SessionProvider session={pageProps?.session} refetchInterval={30 * 60}>
      <UserProvider user={pageProps?.session?.user}>
        <VoteProvider votes={pageProps?.cageballEvents?.reduce((result, current) => [...result, ...current.votes], [])}>{children}</VoteProvider>
      </UserProvider>
    </SessionProvider>
  );
};

export default AuthenticatedLayout;
