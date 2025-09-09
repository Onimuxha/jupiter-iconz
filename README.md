# Jupiter Icons

A modern, developer‑friendly, colorful SVG icon library and website.

- React + TypeScript + Vite
- TailwindCSS with class‑based light/dark
- Framer Motion animations
- Accessible (ARIA labels, keyboard navigation)

Live app (dev): `/` homepage, `/docs` documentation.

## Repository structure

```
packages/
  jupiter-icons/            # Icon component library (source)
client/                     # Docs website (SPA) built with Vite + React Router
server/                     # Express server used during dev
shared/                     # Shared types
apps/web/                   # Reserved for future standalone docs app (currently unused)
```

## Requirements

- Node.js >= 18
- pnpm (preferred)

## Install & run

```bash
pnpm install
pnpm dev          # Dev server (Vite + Express)
# open http://localhost:8080
```

Build production bundles:

```bash
pnpm build        # Builds SPA to dist/spa and server to dist/server
pnpm start        # Starts the built server
```

## Using the icon package

Once published to npm as `jupiter-icons`:

```tsx
import { Photoshop, VSCode } from "jupiter-icons";

export default function Example() {
  return (
    <div>
      <Photoshop size={24} aria-label="Adobe Photoshop" />
      <VSCode size={48} className="align-middle" />
    </div>
  );
}
```

Props supported by every icon component:

- `size?: number` (pixels; default 24)
- `className?: string`
- `style?: React.CSSProperties`
- `aria-label?: string`
- `onClick?: (e: React.MouseEvent) => void`

## Library authoring

Icons are defined by category files under:

```
packages/jupiter-icons/src/categories/
  Programming.ts
  Websites.ts
  Apps.ts
  DesignTools.ts
```

Each file exports `const iconsData: IconData[]`, where an `IconData` is:

```ts
interface IconData {
  name: string;
  category: string;
  keywords: string[];
  svgContent: string;     // raw <svg>…</svg> with original brand colors/gradients
  weights: string[];      // e.g. ["regular"]
}
```

The component factory lives at `packages/jupiter-icons/src/createIcon.tsx` and safely renders colorful SVG using `dangerouslySetInnerHTML` with width/height normalization.

To add an icon:

1) Pick a category file (or create a new one) and append a new `IconData` with original brand SVG (no color stripping).
2) Export the component name by adding it to `packages/jupiter-icons/src/index.ts` (it auto‑builds components from the data set and re‑exports named icons).

## Accessibility

- All icons accept `aria-label`; default label equals the icon name.
- Keyboard: Enter/Space triggers `onClick` handlers.

## Publishing the package to npm

The repository includes source TypeScript in `packages/jupiter-icons`. To publish a compiled package, use `tsup` (or Vite library mode). Suggested setup:

1) Install build tool in the root repo:

```bash
pnpm add -D tsup typescript
```

2) Create `packages/jupiter-icons/tsup.config.ts` (example):

```ts
import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2020",
  treeshake: true,
});
```

3) Update `packages/jupiter-icons/package.json`:

```json
{
  "name": "jupiter-icons",
  "version": "0.1.0",
  "private": false,
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "prepublishOnly": "pnpm build"
  },
  "sideEffects": false
}
```

4) Build & publish from the root:

```bash
pnpm --filter jupiter-icons build
npm publish ./packages/jupiter-icons --access public
```

(Ensure you are logged in to npm and `name` is available.)

## Deploying the website

- Netlify or Vercel are recommended. In Builder.io Projects, connect the respective MCP server and deploy:
  - Netlify: Connect, then trigger deploy (provider builds the repo).
  - Vercel: Connect, then deploy from main.
- Locally you can also serve the built SPA + server with `pnpm start`.

## Performance notes

- Glassmorphism is scoped to cards and shells; avoid full‑page heavy blur when possible.
- Animations use short durations (≈120ms) and layout transitions are limited for smoother route changes.

## License

You own your icon SVGs and trademarks. Provide attribution or licenses where required by brand owners before publishing.
