import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { DeleteIcon, EditIcon } from "@/src/icons";
import { ITrim } from "@/src/types";

export const columns = [
  { name: "TRIM", uid: "trim" },
  { name: "MAKE", uid: "make" },
  { name: "MODEL", uid: "model" },
  { name: "YEAR", uid: "year" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TrimsTable({
  trims,
  setSelectedTrim,
  onDeleteOpen,
  onEditOpen,
}: any) {
  const renderCell = (trim: any, columnKey: any) => {
    const cellValue = trim[columnKey];

    switch (columnKey) {
      case "trim":
        return trim?.trim;
      case "make":
        return trim.make?.make;
      case "model":
        return trim.model?.model;
      case "year":
        return trim.year?.year;

      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Edit">
              <span
                onClick={() => {
                  setSelectedTrim(trim);
                  onEditOpen();
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip content="Delete" className="bg-rose-600">
              <span
                onClick={() => {
                  setSelectedTrim(trim);
                  onDeleteOpen();
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

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <Table aria-label="trims Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={trims.data}>
          {(item: any) => (
            <TableRow key={item._id}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
