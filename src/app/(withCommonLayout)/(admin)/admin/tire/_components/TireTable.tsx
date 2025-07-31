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
import { Eye, ViewIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "YEAR", uid: "year" },
  { name: "BRAND", uid: "brand" },
  { name: "PRICE", uid: "price" },
  { name: "IMAGE", uid: "images" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TiresTable({
  tires,
  setSelectedTire,
  onDeleteOpen,
  onEditOpen,
}: any) {
  const router = useRouter();

  const renderCell = (tire: any, columnKey: any) => {
    const cellValue = tire[columnKey];

    switch (columnKey) {
      case "name":
        return tire?.name;

      case "year":
        return tire?.year?.year;

      case "brand":
        return tire?.brand?.name;

      case "price":
        return tire?.price;

      case "images":
        return (
          <div>
            {tire.images && tire.images.length > 0 ? (
              <Image
                src={`${envConfig.base_url}${tire.images[0]}`}
                alt={tire.name}
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
                  setSelectedTire(tire);
                  router.push(`/admin/tire/${tire._id}`);
                }}
                className="text-lg text-blue-500 cursor-pointer active:opacity-50"
              >
                <Eye />
              </span>
            </Tooltip>

            <Tooltip content="Edit">
              <span
                onClick={() => {
                  router.push(`/admin/tire/update/${tire._id}`); // navigate to dynamic update page
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>

            <Tooltip content="Delete" className="bg-rose-600">
              <span
                onClick={() => {
                  setSelectedTire(tire);
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
      <Table aria-label="makes Table">
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
        <TableBody items={tires?.data}>
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
