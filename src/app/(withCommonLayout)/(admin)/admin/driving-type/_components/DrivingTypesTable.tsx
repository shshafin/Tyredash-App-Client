import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { DeleteIcon, EditIcon } from "@/src/icons";
import { Tooltip } from "@heroui/tooltip";
import { IDrivingType } from "@/src/types";

export const columns = [
  { name: "TITLE", uid: "title" },
  { name: "SUB TITLE", uid: "subTitle" },
  {
    name: "OPTIONS",
    uid: "options",
    render: (drivingType: any) => drivingType.options.join(", "),
  },
  { name: "ACTIONS", uid: "actions" },
];

export default function DrivingTypesTable({
  drivingTypes,
  onEditOpen,
  onDeleteOpen,
  setSelectedDrivingType,
  setOptions,
}: any) {
  const renderCell = (drivingType: any, columnKey: any) => {
    const cellValue = drivingType[columnKey];

    switch (columnKey) {
      case "title":
        return drivingType?.title;
      case "subTitle":
        return drivingType?.subTitle;
      case "options":
        return drivingType.options?.length
          ? drivingType.options.join(", ")
          : "—";
      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Edit">
              <span
                onClick={() => {
                  // console.log({ drivingType });
                  setSelectedDrivingType(drivingType);
                  setOptions(drivingType.options);
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
                  setSelectedDrivingType(drivingType);
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
      <Table aria-label="drivingTypes Table">
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
        <TableBody items={drivingTypes.data}>
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
