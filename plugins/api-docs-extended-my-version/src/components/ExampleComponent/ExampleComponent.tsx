/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Content,
  ContentHeader,
  CreateButton,
  OverflowTooltip,
  PageWithHeader,
  SupportButton,
  TableColumn,
  TableProps,
} from '@backstage/core-components';
import { configApiRef, useApi, useRouteRef } from '@backstage/core-plugin-api';
import { CatalogTable, CatalogTableRow } from '@backstage/plugin-catalog';
import {
  EntityKindPicker,
  EntityLifecyclePicker,
  EntityListProvider,
  EntityOwnerPicker,
  EntityTagPicker,
  EntityTypePicker,
  UserListFilterKind,
  UserListPicker,
  CatalogFilterLayout,
  humanizeEntityRef,
  EntityRefLink,
} from '@backstage/plugin-catalog-react';
import React from 'react';
import { Chip } from '@material-ui/core';

// import { Entity } from "@backstage/cart" 
// import { registerComponentRouteRef } from '../../routes';
const nameColumn=(options?: {
  defaultKind?: string;
}):TableColumn<CatalogTableRow> =>{
  // function formatContent(entity: Entity): string {
  //   return (
  //     entity.metadata?.title ||
  //     humanizeEntityRef(entity, {
  //       defaultKind: options?.defaultKind,
  //     })
  //   );
  // }

  return {
    title: 'Name of API',
    field: 'resolved.name',
    highlight: true,
    // customSort({ entity: entity1 }, { entity: entity2 }) {
    //   // TODO: We could implement this more efficiently by comparing field by field.
    //   // This has similar issues as above.
    //   return formatContent(entity1).localeCompare(formatContent(entity2));
    // },
    render: ({ entity }) => (
      <EntityRefLink
        entityRef={entity}
        defaultKind={options?.defaultKind || 'Component'}
        title={entity.metadata?.title}
        // children="hello"
      />
      // 
      // <OverflowTooltip
      //     text={entity.metadata.name}
      //     placement="bottom-start"
      //   />
    ),
  };
}
const categoriesColumn = (labelCategory:string): TableColumn<CatalogTableRow> => {
  return {
    title: 'Categories',
    field: 'entity.metadata.labels',
    cellStyle: {
      padding: '0px 16px 0px 20px',
    },
    render: ({ entity }) => (
      
      <>
        {entity.metadata.labels && entity.metadata.etag?
          (<Chip
              key={entity.metadata.labels[entity.metadata.etag]}
              label={entity.metadata.labels[entity.metadata.etag]}
              size="small"
              variant="outlined"
              style={{ marginBottom: '0px' }}
            />):(<Chip
              key="Undefined category"
              label="Undefined category"
              size="small"
              variant="outlined"
              style={{ marginBottom: '0px' }}
            />)
          }
      </>
    ),
    width: 'auto',
  };
}

const defaultColumns: TableColumn<CatalogTableRow>[] = [
  CatalogTable.columns.createTitleColumn({ hidden: true }),
  CatalogTable.columns.createNameColumn({ defaultKind: 'API' }),
  CatalogTable.columns.createSystemColumn(),
  CatalogTable.columns.createOwnerColumn(),
  CatalogTable.columns.createSpecTypeColumn(),
  CatalogTable.columns.createSpecLifecycleColumn(),
  CatalogTable.columns.createMetadataDescriptionColumn(),
  CatalogTable.columns.createTagsColumn(),
];

const customizedColumns: TableColumn<CatalogTableRow>[] = [
  categoriesColumn('category'),
  CatalogTable.columns.createTitleColumn({ hidden: true }),
  nameColumn({ defaultKind: 'API' }),
  CatalogTable.columns.createSystemColumn(),
  CatalogTable.columns.createOwnerColumn(),
  CatalogTable.columns.createSpecTypeColumn(),
  CatalogTable.columns.createSpecLifecycleColumn(),
  CatalogTable.columns.createMetadataDescriptionColumn(),
  CatalogTable.columns.createTagsColumn(),
];

/**
 * DefaultApiExplorerPageProps
 * @public
 */
export type DefaultApiExplorerPageProps = {
  initiallySelectedFilter?: UserListFilterKind;
  columns?: TableColumn<CatalogTableRow>[];
  actions?: TableProps<CatalogTableRow>['actions'];
};

/**
 * DefaultApiExplorerPage
 * @public
 */
export const ExampleComponent = (props: DefaultApiExplorerPageProps) => {
  const { initiallySelectedFilter = 'all', columns, actions } = props;

  const configApi = useApi(configApiRef);
  const generatedSubtitle = `${configApi.getOptionalString('organization.name') ?? 'Backstage'
    } API Explorer`;
  // const registerComponentLink = useRouteRef(registerComponentRouteRef);

  return (
    <PageWithHeader
      themeId="apis"
      title="APIs"
      subtitle={generatedSubtitle}
      pageTitleOverride="APIs"
    >
      <Content>
        <ContentHeader title="">
          {/* <CreateButton
            title="Register Existing API"
            to={registerComponentLink?.()}
          /> */}
          <SupportButton>All your APIs</SupportButton>
        </ContentHeader>
        <EntityListProvider>
          <CatalogFilterLayout>
            <CatalogFilterLayout.Filters>
              <EntityKindPicker initialFilter="api" hidden />
              <EntityTypePicker />
              <UserListPicker initialFilter={initiallySelectedFilter} />
              <EntityOwnerPicker />
              <EntityLifecyclePicker />
              <EntityTagPicker />
            </CatalogFilterLayout.Filters>
            <CatalogFilterLayout.Content>
              <CatalogTable
                columns={customizedColumns}
                actions={actions}
              />
            </CatalogFilterLayout.Content>
          </CatalogFilterLayout>
        </EntityListProvider>
      </Content>
    </PageWithHeader>
  );
};
