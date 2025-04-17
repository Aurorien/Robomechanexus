import { useState, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import "./ChipTable.css";
import { ChipData } from "../../utils/interfaces";

interface ChipTableProps {
  data: ChipData[];
}

const ChipTable = ({ data }: ChipTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<ChipData>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("chip_name", {
        header: "Name",
        cell: (info) => info.getValue(),
        // size: 150,
        minSize: 10,
        enableResizing: true,
      }),
      columnHelper.accessor("chip_use", {
        header: "Use",
        cell: (info) => info.getValue(),
        // size: 150,
        minSize: 10,
        enableResizing: true,
      }),
      columnHelper.accessor("item_type_name", {
        header: "Type",
        cell: (info) => info.getValue(),
        // size: 150,
        minSize: 10,
        enableResizing: true,
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
        <div
          className="resizable-table-container"
          style={{ position: "relative" }}
        >
          <table className="chip-table-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={
                        header.column.getIsSorted()
                          ? `sorted-${header.column.getIsSorted()}`
                          : ""
                      }
                      style={{
                        width: header.getSize(),
                        position: "relative",
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
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      <div className="truncate-text">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
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
