import { useUser } from "@/components/user";
import { getCageball } from "@/lib/cageball";
import { CageballResponse } from "@/types";
import type { GetServerSideProps } from "next";
import { getSession, signIn, signOut } from "next-auth/react";

const Home = ({ cageballData }: { cageballData: CageballResponse }) => {
  const { user } = useUser();

  return (
    <div>
      <h1>{user ? `Hi ${user.name}` : "Click button below to login"}</h1>
      {user ? <button onClick={() => signOut()}>Logout</button> : <button onClick={() => signIn()}>Login</button>}
      {cageballData && <pre>{JSON.stringify(cageballData, null, 2)}</pre>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
      cageballData: await getCageball(),
    },
  };
};

export default Home;
