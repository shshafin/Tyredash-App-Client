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

export const columns = [
  { name: "TYRE SIZE", uid: "tireSize" },
  { name: "MAKE", uid: "make" },
  { name: "MODEL", uid: "model" },
  { name: "YEAR", uid: "year" },
  { name: "TRIM", uid: "trim" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TyreSizesTable({
  tyreSizes,
  setSelectedTyreSize,
  onDeleteOpen,
  onEditOpen,
}: any) {
  const renderCell = (tyreSize: any, columnKey: any) => {
    const cellValue = tyreSize[columnKey];

    switch (columnKey) {
      case "tireSize":
        return tyreSize?.tireSize;
      case "make":
        return tyreSize.make?.make;
      case "model":
        return tyreSize.model?.model;
      case "year":
        return tyreSize.year?.year;
      case "trim":
        return tyreSize?.trim?.trim;

      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Edit">
              <span
                onClick={() => {
                  setSelectedTyreSize(tyreSize);
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
                  setSelectedTyreSize(tyreSize);
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
      <Table aria-label="tyreSizes Table">
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
        <TableBody items={tyreSizes.data}>
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
