import { CSS, styled, VariantProps } from "@joga-bonito/ui";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import * as React from "react";

const LinkRoot = styled("a", {
  textDecoration: "none",
  transition: "color 0.2s ease-in-out",
  color: "$text",
  length: undefined,
});

type LinkProps = VariantProps<typeof LinkRoot> & {
  children: React.ReactNode;
  href: string;
  as?: string;
  onClick?: React.MouseEventHandler;
  isExternal?: boolean;
  css?: CSS;
} & NextLinkProps;

const Link = ({ children, href, as, isExternal = false, ...other }: LinkProps) => {
  const linkProps =
    as !== null && as !== undefined
      ? {
          href,
          as,
          passHref: true,
        }
      : {
          href,
          passHref: true,
        };

  if (isExternal) {
    return (
      <LinkRoot href={href} target="_blank" rel="noreferrer" {...other}>
        {children}
      </LinkRoot>
    );
  }

  return (
    <NextLink {...linkProps}>
      <LinkRoot {...other}>{children}</LinkRoot>
    </NextLink>
  );
};

export default Link;
