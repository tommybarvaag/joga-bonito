import { UserUpdateName } from "@/components/user";
import type { User } from "@/types";
import { fetcher } from "@/utils/fetcher";
import * as React from "react";
import { useDebounce } from "react-use";
import useSWR from "swr";

type UserContextProps = {
  user: User;
  update: (updatedUser: Partial<User>) => Promise<void>;
  isLoadingUser: boolean;
};

const UserContext = React.createContext<UserContextProps>(null);

function UserProvider({ children, user }) {
  const { data, mutate } = useSWR<User>(() => `/api/user/${user.id}`, fetcher, {
    fallbackData: user,
    revalidateOnMount: true,
  });

  useDebounce(
    async () => {
      await fetch(`/api/user/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    1000,
    [data]
  );

  const update = React.useCallback(
    async (updatedUser: Partial<User>) => {
      await mutate(
        (user: User) => ({
          ...user,
          ...updatedUser,
        }),
        false
      );
    },
    [mutate]
  );

  const value = React.useMemo(
    () => ({
      user: data,
      update,
      isLoadingUser: !data,
    }),
    [data, update]
  );

  return <UserContext.Provider value={value}>{data.name ? children : <UserUpdateName />}</UserContext.Provider>;
}
function useUser() {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

export { UserProvider, useUser };
