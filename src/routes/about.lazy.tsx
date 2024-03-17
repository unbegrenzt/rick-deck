import React from 'react'

import { createLazyFileRoute } from '@tanstack/react-router'

import {
  ColumnDef,
} from '@tanstack/react-table'

import RicksTable from 'components/organisms/RicksTable';
import HeartCheckbox from 'components/atoms/HeartCheckbox';
import RickCard from 'components/molecules/RickCard';

import { fetchRicksData, Character } from 'services/fetchRicksService';

export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {


  const columns = React.useMemo<ColumnDef<Character>[]>(
    () => [
      {
        id: 'rickCard',
        header: '',
        cell: ({ row }) => (
          <RickCard
            character={row.original}
            actionButton={(
              <HeartCheckbox
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />
            )}
          />
        ),
      }
    ],
    []
  )

  return (
    <RicksTable
      {...{
        columns,
        fetcher: fetchRicksData,
        meta: {
          isPaginationVisible: false,
          isRefetchOnAction: true
        }
      }}
    />
  );
}
