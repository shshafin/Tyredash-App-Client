import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { Chip } from "@heroui/chip";
import { DeleteIcon, EditIcon } from "@/src/icons";
import Image from "next/image";
import { envConfig } from "@/src/config/envConfig";
import { IDeal } from "@/src/types";
import { useRouter } from "next/navigation";

export const columns = [
  { name: "TITLE", uid: "title" },
  { name: "BRAND", uid: "brand" },
  { name: "DISCOUNT", uid: "discountPercentage" },
  { name: "PRODUCTS", uid: "applicableProducts" },
  { name: "VALID PERIOD", uid: "validPeriod" },
  { name: "IMAGE", uid: "image" },
  { name: "ACTIONS", uid: "actions" },
];

interface DealsTableProps {
  deals: { data: IDeal[] };
  setSelectedDeal: (deal: IDeal) => void;
  onDeleteOpen: () => void;
  onEditOpen: () => void;
}

export default function DealsTable({ deals, setSelectedDeal, onDeleteOpen, onEditOpen }: DealsTableProps) {
  const router = useRouter();
  const renderCell = (deal: IDeal, columnKey: any) => {
    const cellValue = deal[columnKey as keyof IDeal];

    switch (columnKey) {
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{deal?.title}</p>
            <p className="text-bold capitalize text-default-400 text-xs">{deal?.description?.substring(0, 50)}...</p>
          </div>
        );

      case "brand":
        return (
          <div className="flex items-center gap-2">
            {deal.brand?.logo && (
              <Image
                src={`${envConfig.base_url}${deal.brand.logo}`}
                alt={deal.brand.name}
                width={30}
                height={30}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className="text-sm">{deal.brand?.name}</span>
          </div>
        );

      case "discountPercentage":
        return (
          <Chip
            className="capitalize"
            color={deal.discountPercentage >= 20 ? "success" : deal.discountPercentage >= 10 ? "warning" : "default"}
            size="sm"
            variant="flat"
          >
            {deal.discountPercentage}% OFF
          </Chip>
        );

      case "applicableProducts":
        return (
          <div className="flex flex-wrap gap-1">
            {deal.applicableProducts.map((product, index) => (
              <Chip key={index} size="sm" variant="flat" color="primary">
                {product}
              </Chip>
            ))}
          </div>
        );

      case "validPeriod":
        const validFrom = new Date(deal.validFrom).toLocaleDateString();
        const validTo = new Date(deal.validTo).toLocaleDateString();
        return (
          <div className="flex flex-col">
            <p className="text-sm">From: {validFrom}</p>
            <p className="text-sm text-default-400">To: {validTo}</p>
          </div>
        );

      case "image":
        return (
          <div>
            {deal.image ? (
              <Image
                src={`${envConfig.base_url}${deal.image}`}
                alt={deal.title}
                width={60}
                height={60}
                className="w-15 h-15 rounded-lg object-cover"
              />
            ) : (
              <span className="text-sm text-gray-400">No Image</span>
            )}
          </div>
        );

      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            {/* <Tooltip content="Edit (Modal)">
              <span
                onClick={() => {
                  setSelectedDeal(deal);
                  onEditOpen();
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip> */}
            <Tooltip content="Edit (Page)">
              <span
                onClick={() => router.push(`/admin/deals/edit/${deal._id}`)}
                className="text-lg text-blue-500 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip content="Delete" className="bg-rose-600">
              <span
                onClick={() => {
                  setSelectedDeal(deal);
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
      <Table aria-label="Deals Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={deals.data}>
          {(item: IDeal) => (
            <TableRow key={item._id}>
              {(columnKey: any) => <TableCell>{renderCell(item, columnKey) as React.ReactNode}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
