import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { DeleteIcon, EditIcon } from "@/src/icons";

export const columns = [
  { name: "Width", uid: "width" },
  { name: "ACTIONS", uid: "actions" },
];

export default function WheelWidthTable({ wheelWidths, setSelectedWheelWidth, onDeleteOpen, onEditOpen }: any) {
  const renderCell = (wheelWidth: any, columnKey: any) => {
    const cellValue = wheelWidth[columnKey];

    switch (columnKey) {
      case "width":
        return wheelWidth.width;

      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Edit">
              <span
                onClick={() => {
                  setSelectedWheelWidth(wheelWidth);
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
                  setSelectedWheelWidth(wheelWidth);
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
      <Table aria-label="Wheel Widths Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={wheelWidths.data}>
          {(item: any) => (
            <TableRow key={item._id}>
              {(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
