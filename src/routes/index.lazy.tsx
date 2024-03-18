import React, { useEffect } from 'react'

import {
  ColumnDef,
} from '@tanstack/react-table'

import { createLazyFileRoute } from '@tanstack/react-router'

//custom components
import { fetchFromServer, Character, defaultMetaParameters } from 'services/fetchRicksService'
import RickCard from 'components/molecules/RickCard'
import RicksTable from 'components/organisms/RicksTable'
import HeartCheckbox from 'components/atoms/HeartCheckbox'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {

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
          fetcher: fetchFromServer,
          meta: defaultMetaParameters
        }}
      />
  )
}
