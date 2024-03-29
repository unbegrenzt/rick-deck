import React, { useEffect, useMemo } from 'react'

import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  getSortedRowModel,
  RowSelectionState,
} from '@tanstack/react-table'

import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'

//custom components
import { defaultMetaParameters, MetaParameters, Character, FetcherResult, FetcherMeta } from 'types/index'
import PaginationBar from 'components/molecules/PaginationBar'

import useFavoriteStore from 'store/useFavoriteStore'
import NoCharacters from 'components/molecules/NoCharacters'

export default function RicksTable({
  columns,
  fetcher,
  meta = defaultMetaParameters
}: {
  columns: ColumnDef<Character>[],
  fetcher: (options: PaginationState, meta: FetcherMeta) => Promise<FetcherResult>
  meta?: MetaParameters
}) {

  const favCharacters = useFavoriteStore((state) => state.favCharacters)
  const updateFavorites = useFavoriteStore((state) => state.updateFavorites)

  const [selectedCharacters, setSelectedCharacters] = React.useState<RowSelectionState>(favCharacters);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  const defaultData = useMemo(() => [], [])

  const dataQuery = useQuery({
    queryKey: ['data', pagination],
    queryFn: () => fetcher(pagination, { data: favCharacters }),
    placeholderData: keepPreviousData,
  })

  const table = useReactTable({
    columns,
    data: dataQuery.data?.rows ?? defaultData,
    debugTable: true,
    rowCount: dataQuery.data?.rowCount,
    enableRowSelection: () => Object.keys(selectedCharacters).length <= 3,
    getRowId: row => `${row.id}`,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onRowSelectionChange: setSelectedCharacters,
    state: {
      pagination,
      rowSelection: selectedCharacters
    },
    manualPagination: true,
  });

  useEffect(() => {
    if (meta.isRefetchOnAction) {
      dataQuery.refetch();
    }
  }, [favCharacters]);

  useEffect(() => {
    updateFavorites(selectedCharacters);
  }, [selectedCharacters]);

  if (dataQuery.data?.rows.length === 0) {
    return(
      <NoCharacters />
    )
  }

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className='w-full'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className='flex flex-col md:grid md:grid-cols-2 lg:grid-cols-2 gap-3 mb-2/3'>
          {table.getRowModel().rows.map(row => {
            return (
              <tr className='flex justify-center' key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td className='w-3/4 md:w-5/6 lg:w-11/12 cursor-default' key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='h-40' />
      {meta.isPaginationVisible && (
        <PaginationBar table={table} />
      )}
    </div>
  )
}
