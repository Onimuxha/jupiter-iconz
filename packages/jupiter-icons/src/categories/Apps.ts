import type { IconData } from "../types";

export const iconsData: IconData[] = [
  {
    name: "VSCode",
    category: "Apps",
    keywords: ["vscode", "editor", "code"],
    weights: ["regular"],
    svgContent: `
<svg viewBox="0 0 256 256" width="100%" height="100%">
  <defs>
    <linearGradient id="vsg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#29B6F6" />
      <stop offset="100%" stop-color="#0288D1" />
    </linearGradient>
    <style><![CDATA[
      .wing { fill: url(#vsg); }
    ]]></style>
  </defs>
  <rect width="256" height="256" rx="48" fill="#0E2A35"/>
  <path class="wing" d="M200 48l-56 40 56 40V48z"/>
  <path class="wing" d="M88 88l56 40-56 40-40-40z"/>
  <path class="wing" d="M200 208l-56-40 56-40v80z"/>
</svg>
    `.trim(),
  },
  {
    name: "Slack",
    category: "Apps",
    keywords: ["slack", "chat", "team"],
    weights: ["regular"],
    svgContent: `
<svg viewBox="0 0 256 256" width="100%" height="100%">
  <rect width="256" height="256" rx="48" fill="#fff"/>
  <g>
    <path d="M86 104a18 18 0 1 0-18-18v18h18z" fill="#36C5F0"/>
    <path d="M95 128a18 18 0 1 0 0-36h-45a18 18 0 1 0 0 36h45z" fill="#36C5F0"/>
    <path d="M104 170a18 18 0 1 0-18-18v18h18z" fill="#2EB67D"/>
    <path d="M128 179a18 18 0 1 0 0-36h-45a18 18 0 1 0 0 36h45z" fill="#2EB67D"/>
    <path d="M170 104a18 18 0 1 0-18-18v18h18z" fill="#ECB22E"/>
    <path d="M179 128a18 18 0 1 0 0-36h-45a18 18 0 1 0 0 36h45z" fill="#ECB22E"/>
    <path d="M170 170a18 18 0 1 0-18-18v18h18z" fill="#E01E5A"/>
    <path d="M179 179a18 18 0 1 0 0-36h-45a18 18 0 1 0 0 36h45z" fill="#E01E5A"/>
  </g>
</svg>
    `.trim(),
  },
];
