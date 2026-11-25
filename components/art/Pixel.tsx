import type { CSSProperties } from "react";
import { sprites, type SpriteName } from "./sprites";

interface PixelProps {
  sprite: SpriteName;
  /** Rendered width in px; height follows the texture's aspect ratio. */
  size?: number;
  /** Accessible name. Omit for decorative icons. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

/** A game texture scaled up with hard pixel edges. */
export function Pixel({ sprite, size = 32, label, className, style }: PixelProps) {
  const [w, h] = sprites[sprite];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny pixel textures gain nothing from next/image
    <img
      src={`/mc/items/${sprite}.png`}
      width={size}
      height={Math.round((size * h) / w)}
      alt={label ?? ""}
      aria-hidden={label ? undefined : true}
      className={className}
      style={{ imageRendering: "pixelated", ...style }}
      draggable={false}
      decoding="async"
    />
  );
}
