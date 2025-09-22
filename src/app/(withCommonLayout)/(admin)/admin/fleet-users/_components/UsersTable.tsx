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

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "BUSINESS NAME", uid: "buisnessName" },
  { name: "VEHICLES", uid: "numberOFvehicles" },
  { name: "EMAIL", uid: "email" },
  { name: "PHONE", uid: "phone" },
  { name: "CITY", uid: "city" },
  { name: "STATE", uid: "state" },
  { name: "VERIFIED", uid: "isAdminApproved" },
  { name: "ACTIONS", uid: "actions" },
];

export default function UsersTable({
  users,
  onEditOpen,
  onDeleteOpen,
  setSelectedUser,
}: any) {
  const renderCell = (user: any, columnKey: any) => {
    switch (columnKey) {
      case "name":
        return `${user.firstName} ${user.lastName}`;
      case "buisnessName":
        return user.buisnessName;
      case "numberOFvehicles":
        return user.numberOFvehicles;
      case "email":
        return user.email;
      case "phone":
        return user.phone;
      case "city":
        return user.city;
      case "state":
        return user.state;
      case "isAdminApproved":
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${
              user.isAdminApproved
                ? "bg-green-100 text-green-800 border-green-300"
                : "bg-red-100 text-red-800 border-red-300"
            }`}>
            {user.isAdminApproved ? "Verified" : "Unverified"}
          </span>
        );

      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Edit">
              <span
                onClick={() => {
                  setSelectedUser(user);
                  onEditOpen();
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
                  setSelectedUser(user);
                  onDeleteOpen();
                }}
                className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return user[columnKey];
    }
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <Table aria-label="Users Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users.data}>
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
