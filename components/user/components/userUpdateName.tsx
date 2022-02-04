import { Button, Fieldset, Flex, Form, Heading, Input, Label } from "@/components/ui";
import { useUser } from "@/components/user";
import * as React from "react";

const UserUpdateName = () => {
  const { update } = useUser();
  const [name, setName] = React.useState("");

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      css={{
        height: "100vh",
      }}
    >
      <Heading size="5">Update name</Heading>
      <Form
        id="user-update-name"
        onSubmit={async (e) => {
          e.preventDefault();

          // Update user state
          await update({ name }, true);
        }}
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "$4",
        }}
      >
        <Fieldset>
          <Label htmlFor="usernameInput">Name</Label>
          <Input id="usernameInput" type="text" value={name} placeholder="Name namesen" onChange={(e) => setName(e.currentTarget.value)} />
        </Fieldset>
        <Button type="submit">Update</Button>
      </Form>
    </Flex>
  );
};

export default UserUpdateName;
