import { createIcon } from "./createIcon";
import React from "react";
import type { IconData } from "./types";

import { iconsData as Programming } from "./categories/Programming";
import { iconsData as Websites } from "./categories/Websites";
import { iconsData as Apps } from "./categories/Apps";
import { iconsData as DesignTools } from "./categories/DesignTools";

export type { IconData };
export { createIcon };

// Build components from data
const all: Record<string, ReturnType<typeof createIcon>> = {};
[...Programming, ...Websites, ...Apps, ...DesignTools].forEach((icon) => {
  all[icon.name] = createIcon(icon.name, icon.svgContent);
});

// Named exports for components
export const ReactIcon = all["React"];
export const TypeScript = all["TypeScript"];
export const NodeJS = all["NodeJS"];
export const GitHub = all["GitHub"];
export const Chrome = all["Chrome"];
export const VSCode = all["VSCode"];
export const Slack = all["Slack"];
export const Photoshop = all["Photoshop"];
export const Figma = all["Figma"];

// Category datasets for docs site usage
export const Categories = {
  Programming,
  Websites,
  Apps,
  DesignTools,
};

export const allIconsData: IconData[] = [
  ...Programming,
  ...Websites,
  ...Apps,
  ...DesignTools,
];

// Registry and dynamic Icon component
export const icons = all;
export type IconName = keyof typeof icons;

export interface DynamicIconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}

export function Icon({ name, ...rest }: DynamicIconProps) {
  const Comp = icons[name];
  if (!Comp) return null as any;
  return React.createElement(Comp as any, rest as any);
}
