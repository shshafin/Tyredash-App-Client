"use client";

import React, { useState, useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { DeleteIcon, EditIcon } from "@/src/icons";
import { IFleetNews } from "@/src/types";
import Link from "next/link";

type AdminFleetNewsTableProps = {
  fleetNewsData: IFleetNews[];
  onDeleteOpen?: () => void;
  setSelectedFleetNews?: (fleetNews: IFleetNews) => void;
  rowsPerPage?: number;
};

export const columns = [
  { name: "#", uid: "s/n" },
  { name: "TITLE", uid: "title" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function AdminFleetNewsTable({
  fleetNewsData,
  onDeleteOpen,
  setSelectedFleetNews,
  rowsPerPage = 10,
}: AdminFleetNewsTableProps) {
  const [page, setPage] = useState(1);

  const pages = Math.ceil(fleetNewsData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return fleetNewsData.slice(start, end);
  }, [page, fleetNewsData, rowsPerPage]);
  // Handle case where no data is returned
  if (!fleetNewsData || fleetNewsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Fleet News Found</h3>
          <p className="text-gray-500 dark:text-gray-400">No fleet news items have been created yet.</p>
        </div>
      </div>
    );
  }

  const renderCell = (item: IFleetNews, columnKey: string, index: number) => {
    const cellValue = item[columnKey as keyof IFleetNews];

    switch (columnKey) {
      case "s/n":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{(page - 1) * rowsPerPage + index + 1}</p>
          </div>
        );

      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{item.title}</p>
          </div>
        );

      case "description":
        return (
          <div className="flex flex-col max-w-xs">
            <p className="text-sm text-default-500 truncate" title={item.description}>
              {item.description.length > 60 ? `${item.description.substring(0, 60)}...` : item.description}
            </p>
          </div>
        );

      case "status":
        return (
          <Chip className="capitalize" color={getStatusColor(item.status)} size="sm" variant="flat">
            {item.status}
          </Chip>
        );

      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Edit">
              <Link href={`/admin/fleet-news/edit/${item._id}`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Link>
            </Tooltip>
            <Tooltip content="Delete" className="bg-rose-600">
              <span
                onClick={() => {
                  if (setSelectedFleetNews && onDeleteOpen) {
                    setSelectedFleetNews(item);
                    onDeleteOpen();
                  }
                }}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );

      default:
        return cellValue;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "recent":
        return "success" as const;
      case "active":
        return "primary" as const;
      case "pending":
        return "warning" as const;
      case "inactive":
        return "default" as const;
      default:
        return "default" as const;
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
        <Table
          aria-label="Fleet News Table"
          classNames={{
            wrapper: "min-h-[400px]",
          }}
        >
          <TableHeader columns={columns}>
            {(column: any) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item: IFleetNews) => {
              const index = items.findIndex((newsItem) => newsItem._id === item._id);
              return (
                <TableRow key={item._id}>
                  {(columnKey: any) => <TableCell>{renderCell(item, columnKey, index)}</TableCell>}
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
      </div>

      {/* Custom Pagination */}
      {pages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <div className="flex items-center gap-1">
            {/* Previous Button */}
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`py-2 px-2 border rounded-lg text-sm font-medium shadow-sm ${
                page === 1
                  ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
              let pageNumber;
              if (pages <= 5) {
                pageNumber = i + 1;
              } else if (page <= 3) {
                pageNumber = i + 1;
              } else if (page >= pages - 2) {
                pageNumber = pages - 4 + i;
              } else {
                pageNumber = page - 2 + i;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium shadow-sm ${
                    page === pageNumber
                      ? "bg-gradient-to-r from-orange-600 to-orange-400 text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Show ellipsis if there are more pages */}
            {pages > 5 && page < pages - 2 && <span className="mx-1 text-gray-500 dark:text-gray-400">...</span>}

            {/* Next Button */}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pages}
              className={`py-2 px-2 border rounded-lg text-sm font-medium shadow-sm ${
                page === pages
                  ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Page info */}
          <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, fleetNewsData.length)} of{" "}
            {fleetNewsData.length} entries
          </div>
        </div>
      )}
    </div>
  );
}
