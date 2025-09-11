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
import { Chip } from "@heroui/chip";
import { DeleteIcon, EditIcon } from "@/src/icons";
import Image from "next/image";
import { envConfig } from "@/src/config/envConfig";
import { IBlog } from "@/src/types";
import { useRouter } from "next/navigation";

export const columns = [
  { name: "TITLE", uid: "title" },
  { name: "CATEGORY", uid: "category" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "IMAGE", uid: "image" },
  { name: "CREATED DATE", uid: "createdAt" },
  { name: "ACTIONS", uid: "actions" },
];

interface BlogsTableProps {
  blogs: { data: IBlog[] };
  setSelectedBlog: (blog: IBlog) => void;
  onDeleteOpen: () => void;
}

export default function BlogsTable({
  blogs,
  setSelectedBlog,
  onDeleteOpen,
}: BlogsTableProps) {
  const router = useRouter();
  const renderCell = (blog: IBlog, columnKey: any) => {
    const cellValue = blog[columnKey as keyof IBlog];

    switch (columnKey) {
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{blog?.title}</p>
          </div>
        );

      case "category":
        return (
          <Chip
            className="capitalize"
            color="primary"
            size="sm"
            variant="flat">
            {blog.category}
          </Chip>
        );

      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-sm text-default-400">
              {blog?.description?.substring(0, 100)}...
            </p>
          </div>
        );

      case "createdAt":
        const createdDate = new Date(blog.createdAt!).toLocaleDateString();
        return (
          <div className="flex flex-col">
            <p className="text-sm">{createdDate}</p>
          </div>
        );

      case "image":
        return (
          <div>
            {blog.image ? (
              <Image
                src={`${envConfig.base_url}${blog.image}`}
                alt={blog.title}
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
            <Tooltip content="Edit Blog">
              <span
                onClick={() => router.push(`/admin/blog/edit/${blog._id}`)}
                className="text-lg text-blue-500 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip
              content="Delete"
              className="bg-rose-600">
              <span
                onClick={() => {
                  setSelectedBlog(blog);
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
      <Table aria-label="Blogs Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={blogs.data}>
          {(item: IBlog) => (
            <TableRow key={item._id}>
              {(columnKey: any) => (
                <TableCell>
                  {renderCell(item, columnKey) as React.ReactNode}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
