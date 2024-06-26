"use client"
 
import {
  ColumnDef,
  flexRender,
  getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
  RowData,
  RowModel,
  Row,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useMemo } from "react"
import { Button } from "./button"
import { HttpData, remove_toggled_strs_was_ran, set_remove_toggled_strs_was_ran } from "./s_columns"
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  cn: String,
}

interface HttpTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  cn: String,
  sethr: (request: any, response: any) => any
}



export function DataTable<TData, TValue>({
  columns,
  data,
  cn,
} : DataTableProps<TData, TValue>) {

  columns = useMemo(() => columns as ColumnDef<TData>[],[])
  const [rowSelection, setRowSelection] = React.useState({})

  const table =  useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
    },
  })
 

  if (remove_toggled_strs_was_ran == true)
  {
    setRowSelection({})
    set_remove_toggled_strs_was_ran(false)
  } 

 
  return (
    <>

    <div className={"rounded-md border " + cn}>
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    
    </>
  )
}

export function HttpTable<TData, TValue>({
  columns,
  data,
  cn,
  sethr
} : HttpTableProps<TData, TValue>) {

  columns = useMemo(() => columns as ColumnDef<TData>[],[])
  const [rowSelection, setRowSelection] = React.useState({})

  const table =  useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
  })
 

  if (remove_toggled_strs_was_ran == true)
  {
    setRowSelection({})
    set_remove_toggled_strs_was_ran(false)
  } 

 
  return (
    <>

    <div className={"rounded-md border " + cn}>
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} onClick={() => 
                {
                  let hdr = row.original as HttpData
                  sethr(hdr.request, hdr.response)
                }
              }>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    
    </>
  )
}