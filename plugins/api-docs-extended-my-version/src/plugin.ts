import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const apiDocsExtendedMyVersionPlugin = createPlugin({
  id: 'api-docs-extended-my-version',
  routes: {
    root: rootRouteRef,
  },
});

export const ApiDocsExtendedMyVersionPage = apiDocsExtendedMyVersionPlugin.provide(
  createRoutableExtension({
    name: 'ApiDocsExtendedMyVersionPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
