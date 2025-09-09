import type { IconData } from "../types";

export const iconsData: IconData[] = [
  {
    name: "Photoshop",
    category: "DesignTools",
    keywords: ["adobe", "ps", "photoshop"],
    weights: ["regular"],
    svgContent: `
<svg viewBox="0 0 256 256" width="100%" height="100%">
  <defs>
    <linearGradient id="psg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#001E36" />
      <stop offset="100%" stop-color="#0A2540" />
    </linearGradient>
    <style><![CDATA[
      .frame { fill: url(#psg); }
      .text { fill: #31A8FF; font-family: Arial, Helvetica, sans-serif; font-weight: 700; }
    ]]></style>
  </defs>
  <rect width="256" height="256" rx="36" class="frame"/>
  <text x="46" y="180" font-size="140" class="text">Ps</text>
</svg>
    `.trim(),
  },
  {
    name: "Figma",
    category: "DesignTools",
    keywords: ["figma", "design"],
    weights: ["regular"],
    svgContent: `
<svg viewBox="0 0 256 256" width="100%" height="100%">
  <g>
    <path d="M96 32h32v64H96a32 32 0 1 1 0-64z" fill="#F24E1E"/>
    <path d="M160 32a32 32 0 0 1 0 64h-32V32h32z" fill="#FF7262"/>
    <path d="M160 96a32 32 0 0 1 0 64h-32V96h32z" fill="#A259FF"/>
    <path d="M160 160a32 32 0 1 1-32 32v-32h32z" fill="#1ABCFE"/>
    <path d="M96 96h32v64H96a32 32 0 0 1 0-64z" fill="#0ACF83"/>
  </g>
</svg>
    `.trim(),
  },
];
