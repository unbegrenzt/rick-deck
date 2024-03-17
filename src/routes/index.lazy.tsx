import React from 'react'

import {
  ColumnDef,
} from '@tanstack/react-table'

import { createLazyFileRoute } from '@tanstack/react-router'

//custom components
import { fetchFromServer, Character } from 'src/services/fetchRicksService'
import RickCard from 'components/molecules/RickCard'
import RicksTable from 'components/organisms/RicksTable'

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
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
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
        fetcher: fetchFromServer
      }}
    />
  )
}
