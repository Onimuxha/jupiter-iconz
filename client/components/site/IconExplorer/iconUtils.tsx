import { LayoutGrid, Code2, Globe2, Blocks, PenTool, Bot, DraftingCompass, VectorSquare, Component } from "lucide-react";
import type { ReactNode } from "react";

export const categories = ["All", "Programming", "Websites", "Apps", "DesignTools", "AI", "Tools", "Frameworks", "Other"] as const;

export const iconsMap: Record<string, ReactNode> = {
  All: <LayoutGrid className="w-4 h-4 mr-2" />,
  Programming: <Code2 className="w-4 h-4 mr-2" />,
  Websites: <Globe2 className="w-4 h-4 mr-2" />,
  Apps: <Blocks className="w-4 h-4 mr-2" />,
  DesignTools: <PenTool className="w-4 h-4 mr-2" />,
  AI: <Bot className="w-4 h-4 mr-2" />,
  Tools: <DraftingCompass className="w-4 h-4 mr-2" />,
  Frameworks: <VectorSquare className="w-4 h-4 mr-2" />,
  Other: <Component className="w-4 h-4 mr-2" />,
};
