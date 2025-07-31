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
  { name: "NAME", uid: "name" },
  { name: "SLUG", uid: "slug" },
  { name: "IMAGE", uid: "image" },
  { name: "ACTIONS", uid: "actions" },
];

export default function CategoriesTable({
  categories,
  onEditOpen,
  onDeleteOpen,
  setSelectedCategory,
}: any) {
  const renderCell = (category: any, columnKey: any) => {
    const cellValue = category[columnKey];

    switch (columnKey) {
      case "name":
        return category?.name;
      case "slug":
        return category?.slug;
      case "image":
        return (
          <div>
            {category.image ? (
              <Image
                src={`${envConfig.base_url}${category.image}`}
                alt={category.name}
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
                  setSelectedCategory(category);
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
                  setSelectedCategory(category);
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
    <div className="w-full overflow-x-auto rounded-xl shadow-md">
      <div className="min-w-[600px]">
        <Table aria-label="Categories Table" isStriped>
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
          <TableBody items={categories.data}>
            {(item: any) => (
              <TableRow key={item._id} className="bg-default-50">
                {(columnKey: any) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
