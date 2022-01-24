import { useUser } from "@/components/user";
import * as React from "react";

const UserUpdateName = () => {
  const { user, update } = useUser();
  const [name, setName] = React.useState("");

  return (
    <>
      <h1>Update name</h1>
      <p>Enter name to continue.</p>
      <form
        id="user-update-name"
        onSubmit={async (e) => {
          e.preventDefault();

          // Update user state
          await update({ name });
        }}
      >
        <fieldset>
          <label htmlFor="usernameInput">
            <span>Name</span>
            <input id="usernameInput" type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />
          </label>
        </fieldset>
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UserUpdateName;
