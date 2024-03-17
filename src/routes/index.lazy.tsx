import React from 'react'

import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table'

import { createLazyFileRoute } from '@tanstack/react-router'

//custom components
import { createData, Character } from 'services/makeData'
import RickCard from 'components/molecules/RickCard'
import PaginationBar from 'src/components/molecules/PaginationBar'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const rerender = React.useReducer(() => ({}), {})[1]

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

  const [data, setData] = React.useState(() => createData(50))
  const refreshData = () => setData(() => createData(50))

  return (
    <>
      <Table
        {...{
          data,
          columns,
        }}
      />
      <hr />
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
    </>
  )
}

function Table({
  data,
  columns,
}: {
  data: Character[]
  columns: ColumnDef<Character>[]
}) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [selectedCharacters, setSelectedCharacters] = React.useState({});

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    enableRowSelection: () => Object.keys(selectedCharacters).length <= 3,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onRowSelectionChange: setSelectedCharacters,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
      rowSelection: selectedCharacters
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  })

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
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className='flex flex-col md:grid md:grid-cols-3 lg:grid-cols-3 gap-3 mb-2/3'>
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
      <div className="h-32" />
      <PaginationBar table={table} />
    </div>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: ReactTable<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  )
}
