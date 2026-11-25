import Image from "next/image";

export type SceneKind =
  | "plains" | "castle" | "village" | "cave" | "dripstone" | "deepdark" | "nether" | "crimson" | "basalt"
  | "end" | "endcity" | "redstone" | "cherry" | "ocean" | "mountain" | "snowy";
export type SceneTime = "day" | "dusk" | "night";

interface PixelSceneProps {
  kind: SceneKind;
  time?: SceneTime;
  /** Accessible description. Omit when the screenshot is decorative. */
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Kept for call-site compatibility; screenshots are fixed per kind. */
  seed?: string;
}

const TIME_FILTER: Record<SceneTime, string | undefined> = {
  day: undefined,
  dusk: "sepia(0.35) saturate(1.3) hue-rotate(-12deg) brightness(0.9)",
  night: "brightness(0.42) saturate(0.7) hue-rotate(18deg) contrast(1.1)",
};

/** In-game screenshot (from the Minecraft Wiki) filling its positioned parent. */
export function PixelScene({ kind, time = "day", label, className, sizes = "(min-width: 1024px) 50vw, 100vw", priority }: PixelSceneProps) {
  return (
    <Image
      src={`/mc/scenes/${kind}.webp`}
      alt={label ?? ""}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectFit: "cover", imageRendering: "auto", filter: TIME_FILTER[time], transition: "filter 1.2s steps(8)" }}
    />
  );
}
