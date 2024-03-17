import React, { useState } from 'react'

import { createLazyFileRoute } from '@tanstack/react-router'

import {
  ColumnDef,
} from '@tanstack/react-table'

import RicksTable from 'components/organisms/RicksTable';
import HeartCheckbox from 'components/atoms/HeartCheckbox';
import RickCard from 'components/molecules/RickCard';
import ToastContainer from 'components/molecules/ToastContainer';

import { fetchRicksData, Character } from 'services/fetchRicksService';
import useStack from 'src/hooks/useStack';
import { ToastProps } from 'src/components/atoms/Toast';
import { generateUUIDv4 } from 'src/utils/stringsUtil';

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

  const [toasts, setToasts] = useState([]);

  const addToast = (message: string, type?: 'success' | 'error' | 'info' | 'warning', duration?: number) => {
    setToasts((prevToasts) => [...prevToasts, { message, type, duration }]);
  };



  // Usage example
  const { elements, add, remove, peek, size, clear } = useStack<ToastProps>();

  const handleClick = () => add({ uuid: generateUUIDv4(), message: 'test toast', type: 'info'})

  return (
    <>
      <ToastContainer toasts={elements} />
      <button onClick={handleClick}>Show Toast</button>
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
    </>
  );
}
