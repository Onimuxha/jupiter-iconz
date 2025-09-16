import { createIcon } from "./createIcon";
import React from "react";
import type { IconData } from "./types";

import { iconsData as Programming } from "./categories/Programming";
import { iconsData as AI } from "./categories/AI";
import { iconsData as Frameworks } from "./categories/Frameworks";
import { iconsData as Tools } from "./categories/Tools";
import { iconsData as Apps } from "./categories/Apps";
import { iconsData as DesignTools } from "./categories/DesignTools";
import { iconsData as Other } from "./categories/Other";

export type { IconData };
export { createIcon };

const all: Record<string, ReturnType<typeof createIcon>> = {};
[...Programming, ...Apps, ...DesignTools, ...AI, ...Frameworks, ...Tools, ...Other].forEach((icon) => {
  all[icon.name] = createIcon(icon.name, icon.svgContent);
});
// -----------------------------------------------------------------------------------------------------------

export const ReactIcon = all["React"];
export const TypeScript = all["TypeScript"];
export const NodeJS = all["NodeJS"];
export const GitHub = all["GitHub"];
export const Chrome = all["Chrome"];
export const VSCode = all["VSCode"];
export const Slack = all["Slack"];
export const AlpineJs = all["AlpineJs"];
export const ThreeJs = all["ThreeJs"];

export const NestJs = all["NestJs"];
export const MeteorJs = all["MeteorJs"];
export const JestJs = all["JestJs"];
export const ElectronJs = all["ElectronJs"];
export const NextJs = all["NextJs"];

export const GatsbyJs = all["GatsbyJs"];
export const NuxtJs = all["NuxtJs"];
export const ExpressJs = all["ExpressJs"];
export const BackboneJs = all["BackboneJs"];
export const ReduxJs = all["ReduxJs"];
export const Jquery = all["Jquery"];

export const Figma = all["Figma"];
export const Photoshop = all["Photoshop"];

// -----------------------------------------------------------------------------------------------------------
export const Categories = {
  Programming,
  Apps,
  DesignTools,
  AI,
  Frameworks,
  Tools,
  Other,
};

const allCategories = [
  ...Programming,
  ...Apps,
  ...DesignTools,
  ...AI,
  ...Frameworks,
  ...Tools,
  ...Other,
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
