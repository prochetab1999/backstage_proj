import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { apiDocsExtendedMyVersionPlugin, ApiDocsExtendedMyVersionPage } from '../src/plugin';

createDevApp()
  .registerPlugin(apiDocsExtendedMyVersionPlugin)
  .addPage({
    element: <ApiDocsExtendedMyVersionPage />,
    title: 'Root Page',
    path: '/api-docs-extended-my-version'
  })
  .render();
