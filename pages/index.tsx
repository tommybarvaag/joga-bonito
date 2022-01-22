import { getCageball } from "@/lib/cageball";
import { CageballResponse } from "@/types";
import type { GetServerSideProps } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

const Home = ({ cageballData }: { cageballData: CageballResponse }) => {
  const { data } = useSession();

  return (
    <div>
      <h1>{data ? `Hi ${data?.user?.email}` : "Click button below to login"}</h1>
      {data ? <button onClick={() => signOut()}>Logout</button> : <button onClick={() => signIn()}>Login</button>}
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
