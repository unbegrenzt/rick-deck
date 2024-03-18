import React, { useEffect } from 'react'

import {
  ColumnDef,
} from '@tanstack/react-table'
import { createLazyFileRoute } from '@tanstack/react-router'

//custom components
import { fetchFromServer } from 'services/fetchRicksService'

import RickCard from 'components/molecules/RickCard'
import RicksTable from 'components/organisms/RicksTable'
import HeartCheckbox from 'components/atoms/HeartCheckbox'
import ToastContainer from 'components/molecules/ToastContainer';

import useToastStore from 'store/useToastStore';

import { Character, defaultMetaParameters } from 'types/index'

import { generateUUIDv4 } from 'utils/stringsUtil';

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {

  const showToast = useToastStore((state) => state.showToast);

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

  useEffect(() => {
    showToast({ uuid: generateUUIDv4(), message: 'No podemos tomar mas de 3 personajes de este universo', type: 'info' })
  }, [])

  return (
    <>
      <ToastContainer />
      <RicksTable
        {...{
          columns,
          fetcher: fetchFromServer,
          meta: defaultMetaParameters
        }}
      />
    </>
  )
}
