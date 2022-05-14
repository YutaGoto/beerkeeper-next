import { NextComponentType, NextPageContext } from "next/types";
import Link, { LinkProps as NextLinkProps } from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

type LinkProps = ChakraLinkProps & NextLinkProps;

const isExternalLink = (href: any): boolean => {
  if (typeof href !== "string") return false;
  return href.startsWith("http");
};

export const ModifiedLink: NextComponentType<
  NextPageContext,
  null,
  LinkProps
> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  children,
  passHref,
  ...props
}) => {
  return (
    <Link
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}
      passHref={passHref}
    >
      <ChakraLink
        {...props}
        onClick={(): void => (document.activeElement as HTMLElement).blur()}
        rel={isExternalLink(href) ? "nofollow noreferrer" : undefined}
      >
        {children}
      </ChakraLink>
    </Link>
  );
};
