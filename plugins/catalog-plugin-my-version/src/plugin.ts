import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const catalogPluginMyVersionPlugin = createPlugin({
  id: 'catalog-plugin-my-version',
  routes: {
    root: rootRouteRef,
  },
});

export const CatalogPluginMyVersionPage = catalogPluginMyVersionPlugin.provide(
  createRoutableExtension({
    name: 'CatalogPluginMyVersionPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
