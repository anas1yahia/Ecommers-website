import { RenderMode, ServerRoute } from '@angular/ssr';

// This function provides the parameter values for prerendering routes with dynamic parameters
export function getPrerenderParams(): Promise<Record<string, string>[]> {
  return Promise.resolve([
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]);
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product-details/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams
  },
  {
    // Use SSR for the home route instead of prerendering to avoid timeout
    path: 'home',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
