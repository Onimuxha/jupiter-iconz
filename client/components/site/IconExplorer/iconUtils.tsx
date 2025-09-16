import { IconLayoutGrid, IconCode, IconApps, IconVectorBezier, IconRobot, IconColorFilter, IconVector, IconGrid4x4} from "@tabler/icons-react";
import type { ReactNode } from "react";

export const categories = ["All", "Programming", "Apps", "DesignTools", "AI", "Tools", "Frameworks", "Other"] as const;

export const iconsMap: Record<string, ReactNode> = {
  All: <IconLayoutGrid className="w-4 h-4 mr-2" />,
  Programming: <IconCode className="w-4 h-4 mr-2" />,
  Apps: <IconApps className="w-4 h-4 mr-2" />,
  DesignTools: <IconVectorBezier className="w-4 h-4 mr-2" />,
  AI: <IconRobot className="w-4 h-4 mr-2" />,
  Tools: <IconColorFilter className="w-4 h-4 mr-2" />,
  Frameworks: <IconVector className="w-4 h-4 mr-2" />,
  Other: <IconGrid4x4 className="w-4 h-4 mr-2" />,
};
