import type { BrandLogoProps } from "./brand-logo.types";

export function BrandLogo(props: BrandLogoProps) {
  const className = props.className || "h-10 w-auto";

  return <img src="/logo.png" alt="Speedo" className={className} />;
}
