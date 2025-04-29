import { useState, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import "./ChipTable.css";
import { ChipData } from "../../utils/interfaces";
import DeleteIcon from "../../assets/DeleteIcon";
import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}

interface ChipTableProps {
  data: ChipData[];
  onDeleteChip?: (chipId: number) => void;
}

const ChipTable = ({ data, onDeleteChip }: ChipTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columnHelper = createColumnHelper<ChipData>();

  const dataColumns = useMemo(
    () => [
      columnHelper.accessor("chip_name", {
        header: "Name",
        cell: (info) => info.getValue(),
        size: 80,
        minSize: 10,
        enableResizing: true,
      }),
      columnHelper.accessor("chip_use", {
        header: "Use",
        cell: (info) => info.getValue(),
        minSize: 10,
        enableResizing: true,
      }),
      columnHelper.accessor("item_type_name", {
        header: "Type",
        cell: (info) => info.getValue(),
        size: 80,
        minSize: 10,
        enableResizing: true,
      }),
      columnHelper.accessor("chip_id", {
        header: "Id",
        cell: (info) => info.getValue(),
        size: 20,
        minSize: 10,
        enableResizing: true,
      }),
    ],
    [columnHelper]
  );

  const createDeleteColumn = useMemo(() => {
    return columnHelper.display({
      id: "actions",
      header: "",
      cell: (info) => (
        <div
          className="delete-icon-container"
          onClick={() =>
            onDeleteChip && onDeleteChip(info.row.original.chip_id)
          }
          style={{ cursor: "pointer" }}
        >
          <DeleteIcon />
        </div>
      ),
      size: 20,
      maxSize: 20,
      minSize: 20,
      enableResizing: false,
      meta: {
        className: "sticky-column",
      },
    });
  }, [columnHelper, onDeleteChip]);

  const columns = useMemo(
    () => [...dataColumns, createDeleteColumn],
    [dataColumns, createDeleteColumn]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="chip-table-table-container">
      <div className="chip-table-header">
        <h2 className="chip-table-title">Registered chips</h2>
      </div>

      <div className="table-wrapper">
        <div className="resizable-table-container">
          <table className="chip-table-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`${
                        header.column.getIsSorted()
                          ? `sorted-${header.column.getIsSorted()}`
                          : ""
                      } ${
                        header.column.columnDef.meta?.className ??
                        "relative-column"
                      } 
                        `}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      <div className="th-content truncate-text">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span className="sort-indicator"></span>
                      </div>
                      <div
                        className="resizer"
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                      />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`${
                        cell.column.columnDef.meta?.className ??
                        "relative-column"
                      }-td`}
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      <div className="td-bg">
                        <div className="truncate-text">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="chip-table-pagination">
        <button
          className="ctp-button"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          &lt;&lt;
        </button>
        <button
          className="ctp-button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          &lt;
        </button>
        <div className="page-info">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
        <button
          className="ctp-button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          &gt;
        </button>
        <button
          className="ctp-button"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default ChipTable;
