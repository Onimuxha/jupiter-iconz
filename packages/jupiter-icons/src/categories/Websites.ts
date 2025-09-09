import type { IconData } from "../types";

export const iconsData: IconData[] = [
  {
    name: "GitHub",
    category: "Websites",
    keywords: ["github", "code", "repo"],
    weights: ["regular"],
    svgContent: `
<svg viewBox="0 0 256 256" width="100%" height="100%">
  <circle cx="128" cy="128" r="120" fill="#161b22" />
  <path fill="#fff" d="M128 64c-36 0-64 29-64 64 0 28 18 52 43 60 3 1 5-1 5-3v-18c-18 4-22-8-22-8-3-8-8-10-8-10-7-5 1-5 1-5 8 1 12 9 12 9 7 12 19 9 24 7 1-5 3-9 5-11-15-2-31-8-31-35 0-8 3-14 7-19 0-2-3-9 1-18 0 0 6-2 20 8a70 70 0 0 1 36 0c14-10 20-8 20-8 4 9 1 16 1 18 4 5 7 11 7 19 0 27-16 33-31 35 3 3 6 8 6 17v25c0 2 2 4 5 3 25-8 43-32 43-60 0-35-28-64-64-64z"/>
</svg>
    `.trim(),
  },
  {
    name: "Chrome",
    category: "Websites",
    keywords: ["chrome", "browser", "google"],
    weights: ["regular"],
    svgContent: `
<svg viewBox="0 0 256 256" width="100%" height="100%">
  <defs>
    <linearGradient id="cg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#DB4437" />
      <stop offset="100%" stop-color="#C33D2F" />
    </linearGradient>
  </defs>
  <circle cx="128" cy="128" r="120" fill="#F2F2F2"/>
  <path d="M128 32a96 96 0 0 1 83 48H128L86 56a96 96 0 0 1 42-24z" fill="url(#cg)"/>
  <path d="M211 80a96 96 0 0 1-25 121l-32-55 25-66h32z" fill="#0F9D58"/>
  <path d="M186 201a96 96 0 0 1-143-21l57-1 50 22 36 0z" fill="#FFCD40"/>
  <circle cx="128" cy="128" r="44" fill="#4285F4"/>
  <circle cx="128" cy="128" r="24" fill="#fff"/>
</svg>
    `.trim(),
  },
];
