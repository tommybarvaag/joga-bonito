import { UserUpdateName } from "@/components/user";
import type { User } from "@/types";
import { fetcher } from "@/utils/fetcher";
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
  user: User;
  update: (updatedUser: Partial<User>, commit?: boolean) => Promise<void>;
  isLoadingUser: boolean;
};

const UserContext = React.createContext<UserContextProps>(null);

function UserProvider({ children, user }) {
  const { data, mutate } = useSWR<User>(() => `/api/user/${user.id}`, fetcher, {
    fallbackData: user,
    revalidateOnMount: true,
  });

  const debouncedUpdateHandler = React.useMemo(() => debounce(commitUserToDatabase, 1500), []);

  const update = React.useCallback(
    async (updatedUser: Partial<User>, commit: boolean = false) => {
      const updatedUserData = await mutate(
        (user: User) => ({
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
