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
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "YEAR", uid: "year" },
  { name: "BRAND", uid: "brand" },
  { name: "PRICE", uid: "price" },
  { name: "IMAGE", uid: "images" },
  { name: "ACTIONS", uid: "actions" },
];

export default function WheelsTable({
  wheels,
  setSelectedWheel,
  onDeleteOpen,
  onEditOpen,
}: any) {
  const router = useRouter();

  const renderCell = (wheel: any, columnKey: any) => {
    const cellValue = wheel[columnKey];

    switch (columnKey) {
      case "name":
        return wheel?.name;

      case "year":
        return wheel?.year?.year;

      case "brand":
        return wheel?.brand?.name;

      case "price":
        return wheel?.price;

      case "images":
        return (
          <div>
            {wheel.images && wheel.images.length > 0 ? (
              <Image
                src={`${envConfig.base_url}${wheel.images[0]}`}
                alt={wheel.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <span className="text-sm text-gray-400">No Images</span>
            )}
          </div>
        );
      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="View">
              <span
                onClick={() => {
                  setSelectedWheel(wheel);
                  router.push(`/admin/wheel/${wheel._id}`);
                }}
                className="text-lg text-blue-500 cursor-pointer active:opacity-50">
                <Eye />
              </span>
            </Tooltip>

            <Tooltip content="Edit">
              <span
                onClick={() => {
                  router.push(`/admin/wheel/update/${wheel._id}`); // navigate to dynamic update page
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>

            <Tooltip
              content="Delete"
              className="bg-rose-600">
              <span
                onClick={() => {
                  setSelectedWheel(wheel);
                  onDeleteOpen();
                }}
                className="text-lg text-danger cursor-pointer active:opacity-50">
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
      <Table aria-label="makes Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={wheels?.data}>
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
