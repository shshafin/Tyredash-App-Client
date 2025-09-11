"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { Select, SelectItem } from "@heroui/select";
import { DeleteIcon, EditIcon } from "@/src/icons";
import { Eye, Package, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUpdateOrderStatus } from "@/src/hooks/order.hook";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const columns = [
  { name: "ORDER ID", uid: "orderId" },
  { name: "CUSTOMER", uid: "customer" },
  { name: "EMAIL", uid: "email" },
  { name: "TOTAL", uid: "totalPrice" },
  { name: "ITEMS", uid: "totalItems" },
  { name: "ORDER STATUS", uid: "status" },
  { name: "PAYMENT STATUS", uid: "paymentStatus" },
  { name: "PAYMENT METHOD", uid: "paymentMethod" },
  { name: "ORDER DATE", uid: "createdAt" },
  { name: "ACTIONS", uid: "actions" },
];

// Order status options from your enum
const orderStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
];

// Status badge component
const StatusBadge = ({
  status,
  type,
}: {
  status: string;
  type: "order" | "payment";
}) => {
  const getStatusColor = (status: string, type: "order" | "payment") => {
    if (type === "order") {
      switch (status) {
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "processing":
          return "bg-blue-100 text-blue-800";
        case "shipped":
          return "bg-purple-100 text-purple-800";
        case "delivered":
          return "bg-green-100 text-green-800";
        case "cancelled":
          return "bg-red-100 text-red-800";
        case "refunded":
          return "bg-gray-100 text-gray-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    } else {
      switch (status) {
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "processing":
          return "bg-blue-100 text-blue-800";
        case "completed":
          return "bg-green-100 text-green-800";
        case "failed":
          return "bg-red-100 text-red-800";
        case "refunded":
          return "bg-gray-100 text-gray-800";
        case "cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status, type)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function OrderTable({
  orders,
  setSelectedOrder,
  onDeleteOpen,
}: any) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: updateOrderStatus, isPending: isUpdatingStatus } =
    useUpdateOrderStatus({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_ORDERS"] });
        toast.success("Order status updated successfully");
      },
      onError: () => {
        toast.error("Failed to update order status");
      },
    });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log({ orderId, newStatus });
    updateOrderStatus({
      id: orderId,
      status: newStatus,
    });
  };

  const renderCell = (order: any, columnKey: any) => {
    const cellValue = order[columnKey];

    switch (columnKey) {
      case "orderId":
        return (
          <span className="font-mono text-sm">
            #{order._id.slice(-8).toUpperCase()}
          </span>
        );

      case "customer":
        return (
          <div>
            <div className="font-medium">
              {order.user?.firstName} {order.user?.lastName}
            </div>
            <div className="text-sm text-gray-500">{order.user?.phone}</div>
          </div>
        );

      case "email":
        return <span className="text-sm">{order.user?.email}</span>;

      case "totalPrice":
        return (
          <span className="font-semibold">${order.totalPrice?.toFixed(2)}</span>
        );

      case "totalItems":
        return (
          <div className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            <span>{order.totalItems}</span>
          </div>
        );

      case "status":
        return (
          <div className="flex flex-col gap-2">
            {/* <Select
              size="sm"
              key={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              onSelect={}
              className="min-w-[120px]"
              disabled={isUpdatingStatus}
            >
              {orderStatusOptions.map((option) => (
                <SelectItem key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select> */}
            <Select
              size="sm"
              key={order._id} // not order.status — key should be unique per item, not per value
              selectedKeys={[order.status]} // controlled selected value
              onChange={(e) => {
                handleStatusChange(order._id, e.target.value);
              }}
              className="min-w-[120px]"
              isDisabled={isUpdatingStatus}>
              {orderStatusOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        );

      case "paymentStatus":
        return (
          <StatusBadge
            status={order.payment?.paymentStatus}
            type="payment"
          />
        );

      case "paymentMethod":
        return (
          <span className="capitalize">
            {order.payment?.paymentMethod?.replace("_", " ")}
          </span>
        );

      case "createdAt":
        return (
          <div>
            <div className="text-sm">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(order.createdAt).toLocaleTimeString()}
            </div>
          </div>
        );

      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="View Order Details">
              <span
                onClick={() => {
                  router.push(`/admin/order/${order._id}`);
                }}
                className="text-lg text-blue-500 cursor-pointer active:opacity-50">
                <Eye />
              </span>
            </Tooltip>

            {/* <Tooltip content="Edit Order">
              <span
                onClick={() => {
                  router.push(`/admin/orders/update/${order._id}`);
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip> */}

            {/* {order.status === "shipped" && (
              <Tooltip content="Track Order">
                <span
                  onClick={() => {
                    router.push(`/admin/orders/track/${order._id}`);
                  }}
                  className="text-lg text-green-500 cursor-pointer active:opacity-50"
                >
                  <Truck />
                </span>
              </Tooltip>
            )} */}

            <Tooltip
              content="Delete Order"
              className="bg-rose-600">
              <span
                onClick={() => {
                  // Handle delete order
                  setSelectedOrder(order);
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
      <Table aria-label="Orders Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={orders?.data}>
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
