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
import Image from "next/image";
import { envConfig } from "@/src/config/envConfig";

export const columns = [
  { name: "BRAND NAME", uid: "name" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "LOGO", uid: "logo" },
  { name: "ACTIONS", uid: "actions" },
];

export default function BrandsTable({
  Brands,
  setSelectedBrand,
  onDeleteOpen,
  onEditOpen,
}: any) {
  const renderCell = (Brand: any, columnKey: any) => {
    const cellValue = Brand[columnKey];

    switch (columnKey) {
      case "name":
        return Brand?.name;
      case "description":
        return Brand?.description;

      case "logo":
        return (
          <div>
            {Brand.logo ? (
              <Image
                src={`${envConfig.base_url}${Brand.logo}`}
                alt={Brand.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-sm text-gray-400">No Image</span>
            )}
          </div>
        );

      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Edit">
              <span
                onClick={() => {
                  setSelectedBrand(Brand);
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
                  setSelectedBrand(Brand);
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
      <Table aria-label="Brands Table">
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
        <TableBody items={Brands.data}>
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
