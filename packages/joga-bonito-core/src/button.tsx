import * as React from "react";

const Button = ({ children, type = "button" }: { children?: React.ReactNode; type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] }) => {
  return <button type={type}>{children}</button>;
};

export default Button;
