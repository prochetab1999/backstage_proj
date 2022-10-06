import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { catalogPluginMyVersionPlugin, CatalogPluginMyVersionPage } from '../src/plugin';

createDevApp()
  .registerPlugin(catalogPluginMyVersionPlugin)
  .addPage({
    element: <CatalogPluginMyVersionPage />,
    title: 'Root Page',
    path: '/catalog-plugin-my-version'
  })
  .render();
