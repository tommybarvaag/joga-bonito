import { UserUpdateName } from "@/components/user";
import { UserWithVotes } from "@/lib/user";
import { fetcher } from "@/utils/fetcher";
import { User } from "@prisma/client";
import debounce from "lodash.debounce";
import * as React from "react";
import useSWR from "swr";

const commitUserToDatabase = async (user: User) => {
  await fetch(`/api/user/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

type UserContextProps = {
  user: UserWithVotes;
  update: (updatedUser: Partial<UserWithVotes>, commit?: boolean) => Promise<void>;
  isLoadingUser: boolean;
};

const UserContext = React.createContext<UserContextProps>(null);

function UserProvider({ children, user }) {
  const { data, mutate } = useSWR<UserWithVotes>(() => `/api/user/${user.id}`, fetcher, {
    fallbackData: user,
    revalidateOnMount: true,
  });

  const debouncedUpdateHandler = React.useMemo(() => debounce(commitUserToDatabase, 1500), []);

  const update = React.useCallback(
    async (updatedUser: Partial<User>, commit: boolean = false) => {
      const updatedUserData = await mutate(
        (user: UserWithVotes) => ({
          ...user,
          ...updatedUser,
        }),
        false
      );

      if (commit) {
        await commitUserToDatabase(updatedUserData);
      } else {
        debouncedUpdateHandler(updatedUserData);
      }
    },
    [mutate, debouncedUpdateHandler]
  );

  React.useEffect(() => {
    return () => {
      debouncedUpdateHandler.cancel();
    };
  }, [debouncedUpdateHandler]);

  const value = React.useMemo(
    () => ({
      user: data,
      update,
      isLoadingUser: !data,
    }),
    [data, update]
  );

  return <UserContext.Provider value={value}>{data?.name ? children : <UserUpdateName />}</UserContext.Provider>;
}
function useUser() {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

export { UserProvider, useUser };
