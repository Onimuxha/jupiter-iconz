import { createIcon } from "./createIcon";
import React from "react";
import type { IconData } from "./types";

import { iconsData as Programming } from "./categories/Programming";
import { iconsData as Websites } from "./categories/Websites";
import { iconsData as AI } from "./categories/AI";
import { iconsData as Frameworks } from "./categories/Frameworks";
import { iconsData as Tools } from "./categories/Tools";
import { iconsData as Apps } from "./categories/Apps";
import { iconsData as DesignTools } from "./categories/DesignTools";

export type { IconData };
export { createIcon };

const all: Record<string, ReturnType<typeof createIcon>> = {};
[...Programming, ...Websites, ...Apps, ...DesignTools, ...AI, ...Frameworks, ...Tools].forEach((icon) => {
  all[icon.name] = createIcon(icon.name, icon.svgContent);
});
// -----------------------------------------------------------------------------------------------------------

// Programming iconz
export const ReactIcon = all["React"];
export const TypeScript = all["TypeScript"];
export const NodeJS = all["NodeJS"];
export const GitHub = all["GitHub"];
export const Chrome = all["Chrome"];
export const VSCode = all["VSCode"];
export const Slack = all["Slack"];
export const AlpineJs = all["AlpineJs"];
export const D3Js = all["D3Js"];
export const ThreeJs = all["ThreeJs"];

//Apps iconz
export const NestJs = all["NestJs"];
export const MeteorJs = all["MeteorJs"];
export const JestJs = all["JestJs"];
export const ElectronJs = all["ElectronJs"];
export const NextJs = all["NextJs"];

// Websites iconz
export const GatsbyJs = all["GatsbyJs"];
export const NuxtJs = all["NuxtJs"];
export const ExpressJs = all["ExpressJs"];
export const BackboneJs = all["BackboneJs"];
export const ReduxJs = all["ReduxJs"];
export const Jquery = all["Jquery"];

// Design tools iconz
export const Figma = all["Figma"];
export const Photoshop = all["Photoshop"];

// -----------------------------------------------------------------------------------------------------------
export const Categories = {
  Programming,
  Websites,
  Apps,
  DesignTools,
  AI,
  Frameworks,
  Tools,
};

// Combine all icon data
const allCategories = [
  ...Programming,
  ...Websites,
  ...Apps,
  ...DesignTools,
  ...AI,
  ...Frameworks,
  ...Tools,
];

export const allIconsData: IconData[] = allCategories;

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
