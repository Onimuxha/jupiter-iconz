import { Suspense, lazy } from 'react';

const ShootingStars = lazy(() => import('./shooting-stars').then(mod => ({ default: mod.ShootingStars })));
const StarsBackground = lazy(() => import('./stars-background').then(mod => ({ default: mod.StarsBackground })));

export default function LazyBackground() {
  return (
    <Suspense fallback={null}>
      <div className="pointer-events-none fixed inset-0 z-50 select-none">
        <ShootingStars />
        <StarsBackground />
      </div>
    </Suspense>
  );
}
