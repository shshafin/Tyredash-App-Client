"use client";

import { useGetAllSupportRequests } from "@/src/hooks/fleetSupport.hook";
import { Eye } from "lucide-react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import React, { useEffect, useMemo, useState } from "react";
import { useGetContacts } from "@/src/hooks/contact.hook";

export default function InquiryTable() {
  const supportQuery = useGetContacts(undefined);

  const list = supportQuery?.data?.data || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const filtered = useMemo(() => {
    if (!searchTerm) return list || [];
    return (list || []).filter((item: any) => {
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        (item.issueType || "").toLowerCase().includes(q) ||
        (item.priority || "").toLowerCase().includes(q) ||
        (item.subject || "").toLowerCase().includes(q) ||
        (item.message || "").toLowerCase().includes(q) ||
        (item.status || "").toLowerCase().includes(q)
      );
    });
  }, [list, searchTerm]);

  // Pagination state (client-side)
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const pages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filtered.slice(start, end);
  }, [filtered, page, rowsPerPage]);

  // If filtered changes and current page is out of range, reset to 1
  useEffect(() => {
    if (page > pages && pages > 0) {
      setPage(1);
    }
  }, [page, pages]);

  // Reset to first page when rows per page changes
  useEffect(() => {
    setPage(1);
  }, [rowsPerPage]);

  const handleOpenEdit = (request: any) => {
    setSelectedRequest(request);
    onOpen();
  };

  const renderCell = (item: any, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return <span className="text-sm">{item.name}</span>;
      case "address":
        return <span className="text-sm">{item.address}</span>;
      case "contactInfo":
        return <span className="text-sm font-medium">{item.contactInfo}</span>;
      case "description":
        return <span className="text-sm">{item.description}</span>;
      case "createdAt":
        return (
          <span className="text-sm">
            {item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}
          </span>
        );

      case "actions":
        return (
          <div className="flex items-center justify-center gap-2">
            <Tooltip content="View">
              <span
                onClick={() => handleOpenEdit(item)}
                className="text-lg text-blue-500 cursor-pointer active:opacity-60">
                <Eye className="h-4 w-4" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return item[columnKey];
    }
  };

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ADDRESS", uid: "address" },
    { name: "CONTACTINFO", uid: "contactInfo" },
    { name: "DESCRIPTION", uid: "description" },
    { name: "CREATED", uid: "createdAt" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3">
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-default-500">Rows:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="h-8 px-2 rounded border bg-white dark:bg-gray-800">
            {[5, 10, 20, 50].map((n) => (
              <option
                key={n}
                value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        {supportQuery.isLoading ? (
          <div className="p-6 text-center">Loading Inquiries...</div>
        ) : list.length === 0 ? (
          <div className="p-6 text-center">No Inquiries available</div>
        ) : (
          <>
            <Table
              aria-label="Fleet Support Table"
              className="border rounded-md">
              <TableHeader columns={columns}>
                {(column: any) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={items}>
                {(item: any) => (
                  <TableRow key={item._id}>
                    {(columnKey: any) => (
                      <TableCell>
                        {renderCell(item, columnKey) as React.ReactNode}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination controls */}
            {pages > 1 && (
              <div className="flex justify-center items-center mt-4 gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className={`py-2 px-2 border rounded-lg text-sm font-medium shadow-sm ${
                      page === 1
                        ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

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

                    // Ensure pageNumber is within valid range
                    pageNumber = Math.max(1, Math.min(pages, pageNumber));

                    return (
                      <button
                        key={i}
                        onClick={() => setPage(pageNumber)}
                        className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium shadow-sm ${
                          page === pageNumber
                            ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white"
                            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}>
                        {pageNumber}
                      </button>
                    );
                  })}

                  {pages > 5 && page < pages - 2 && (
                    <span className="mx-1 text-gray-500 dark:text-gray-400">
                      ...
                    </span>
                  )}

                  <button
                    onClick={() => setPage(Math.min(pages, page + 1))}
                    disabled={page === pages}
                    className={`py-2 px-2 border rounded-lg text-sm font-medium shadow-sm ${
                      page === pages
                        ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                  Showing{" "}
                  {Math.min((page - 1) * rowsPerPage + 1, filtered.length)} to{" "}
                  {Math.min(page * rowsPerPage, filtered.length)} of{" "}
                  {filtered.length} entries
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Inquiry Details
              </ModalHeader>
              <ModalBody>
                {selectedRequest ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-default-500">Name</label>
                      <div className="text-sm font-medium">
                        {selectedRequest.name}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-default-500">
                        Address
                      </label>
                      <div className="text-sm">{selectedRequest.address}</div>
                    </div>

                    <div>
                      <label className="text-xs text-default-500">
                        Contact Info
                      </label>
                      <div className="text-sm font-medium">
                        {selectedRequest.contactInfo}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-default-500">
                        Description
                      </label>
                      <div className="text-sm">
                        {selectedRequest.description}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-default-500">
                        Created
                      </label>
                      <div className="text-sm">
                        {selectedRequest.createdAt
                          ? new Date(selectedRequest.createdAt).toLocaleString()
                          : "-"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No request selected</div>
                )}
              </ModalBody>
              <ModalFooter className="flex justify-end gap-2">
                <Button
                  variant="bordered"
                  className="rounded"
                  onPress={() => close()}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
