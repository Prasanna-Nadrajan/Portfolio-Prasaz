import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./MinecraftButton.module.css";

type Variant = "stone" | "grass" | "wood" | "danger" | "gold";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  block?: boolean;
  children: ReactNode;
  className?: string;
}

type LinkProps = BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;
type NativeButtonProps = BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export type MinecraftButtonProps = LinkProps | NativeButtonProps;

export function MinecraftButton(props: MinecraftButtonProps) {
  const { variant = "stone", size = "md", icon, block, children, className, ...rest } = props;
  const cls = [styles.btn, styles[variant], styles[size], block && styles.block, className].filter(Boolean).join(" ");
  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchor } = rest as LinkProps;
    const external = /^https?:/.test(href);
    return external ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...anchor}>
        {content}
      </a>
    ) : (
      <Link href={href} className={cls} {...anchor}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...button } = rest as NativeButtonProps;
  return (
    <button type={type} className={cls} {...button}>
      {content}
    </button>
  );
}
