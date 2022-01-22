import type { GetServerSideProps, NextPage } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data } = useSession();

  return (
    <div>
      <h1>{data ? `Hi ${data?.user?.email}` : "Click button below to login"}</h1>
      {data ? <button onClick={() => signOut()}>Logout</button> : <button onClick={() => signIn()}>Login</button>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

export default Home;
