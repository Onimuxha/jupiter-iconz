import type { IconData } from "../types";

export const iconsData: IconData[] = [
  {
    name: "React",
    category: "Programming",
    keywords: ["react", "frontend", "library", "ui"],
    weights: ["regular"],
    svgContent: `
<svg viewBox="0 0 256 256" width="100%" height="100%">
  <g>
    <circle cx="128" cy="128" r="16" fill="#61DAFB"/>
    <g fill="none" stroke="#61DAFB" stroke-width="12">
      <ellipse rx="90" ry="36" cx="128" cy="128" transform="rotate(0 128 128)"/>
      <ellipse rx="90" ry="36" cx="128" cy="128" transform="rotate(60 128 128)"/>
      <ellipse rx="90" ry="36" cx="128" cy="128" transform="rotate(120 128 128)"/>
    </g>
  </g>
</svg>
    `.trim(),
  },
  {
    name: "TypeScript",
    category: "Programming",
    keywords: ["typescript", "ts", "language"],
    weights: ["regular"],
    svgContent: `
<svg viewBox="0 0 256 256" width="100%" height="100%">
  <defs>
    <linearGradient id="tsg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#3178C6" />
      <stop offset="100%" stop-color="#235A97" />
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="24" fill="url(#tsg)"/>
  <path d="M92 96h72v20h-26v68h-20v-68H92z" fill="#fff"/>
  <path d="M188 184c-10 0-18-6-22-14l17-10c2 4 5 6 9 6 4 0 7-2 7-6 0-9-23-8-23-28 0-12 10-22 26-22 11 0 19 4 24 13l-16 10c-2-4-5-6-8-6-4 0-7 2-7 6 0 9 23 8 23 28 0 13-9 23-30 23z" fill="#fff"/>
</svg>
    `.trim(),
  },
  {
    name: "NodeJS",
    category: "Programming",
    keywords: ["node", "server", "js"],
    weights: ["regular"],
    svgContent: `
<svg viewBox="0 0 256 256" width="100%" height="100%">
  <defs>
    <linearGradient id="nodeg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#8CC84B" />
      <stop offset="100%" stop-color="#4B8C2B" />
    </linearGradient>
  </defs>
  <path d="M128 8l112 64v112l-112 64L16 184V72z" fill="#333"/>
  <path d="M128 24l96 55v96l-96 55-96-55V79z" fill="url(#nodeg)"/>
  <path d="M168 150c0 16-12 26-32 26-14 0-26-5-33-15l14-8c4 5 10 8 19 8 7 0 12-3 12-8 0-14-44-7-44-36 0-15 12-26 31-26 12 0 23 4 30 13l-13 9c-4-5-10-7-17-7-7 0-11 3-11 8 0 14 44 7 44 36z" fill="#fff"/>
</svg>
    `.trim(),
  },
];
