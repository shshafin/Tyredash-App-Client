import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { DeleteIcon, EditIcon } from "@/src/icons";

export const columns = [
  { name: "Ratio", uid: "ratio" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TireRatioTable({ tyreRatios, setSelectedYear, onDeleteOpen, onEditOpen }: any) {
  const renderCell = (ratio: any, columnKey: any) => {
    const cellValue = ratio[columnKey];

    switch (columnKey) {
      case "ratio":
        return ratio.ratio;

      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Edit">
              <span
                onClick={() => {
                  setSelectedYear(ratio);
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
                  setSelectedYear(ratio);
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
      <Table aria-label="Tire Ratios Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={tyreRatios.data}>
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
