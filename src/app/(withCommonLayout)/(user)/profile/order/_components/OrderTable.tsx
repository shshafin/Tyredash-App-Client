"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { useDisclosure } from "@heroui/modal";
import jsPDF from "jspdf";
import {
  Download,
  Eye,
  Package,
  Search,
  Filter,
  Calendar,
  Mail,
  CreditCard,
  MoreVertical,
  FileText,
  Building2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const columns = [
  { name: "ID", uid: "orderId" },
  { name: "CUSTOMER", uid: "customer" },
  { name: "TOTAL", uid: "totalPrice" },
  { name: "ITEMS", uid: "totalItems" },
  { name: "STATUS", uid: "status" },
  { name: "PAYMENT", uid: "paymentStatus" },
  { name: "METHOD", uid: "paymentMethod" },
  { name: "DATE", uid: "createdAt" },
  { name: "ACTIONS", uid: "actions" },
];

const StatusChip = ({
  status,
  type,
}: {
  status: string;
  type: "order" | "payment";
}) => {
  const getStatusColor = (status: string, type: "order" | "payment") => {
    if (type === "order") {
      switch (status?.toLowerCase()) {
        case "pending":
          return "warning";
        case "processing":
          return "primary";
        case "shipped":
          return "secondary";
        case "delivered":
          return "success";
        case "cancelled":
          return "danger";
        case "refunded":
          return "default";
        default:
          return "default";
      }
    } else {
      switch (status?.toLowerCase()) {
        case "pending":
          return "warning";
        case "processing":
          return "primary";
        case "completed":
          return "success";
        case "failed":
          return "danger";
        case "refunded":
          return "default";
        case "cancelled":
          return "danger";
        default:
          return "default";
      }
    }
  };

  return (
    <Chip
      color={getStatusColor(status, type) as any}
      size="sm"
      variant="flat"
      className="capitalize">
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : "N/A"}
    </Chip>
  );
};

// Generate Invoice PDF
const generateInvoice = (order: any) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // ===== HEADER =====
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, pageWidth, 50, "F");

  // Company Info (without logo)
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Tiresdash", 20, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Boynton Beach", 20, 28);
  doc.text("FL, USA | Phone: (561) 232-3230", 20, 34);
  doc.text("Email: info@tiresdash.com", 20, 40);

  // Invoice Title
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", pageWidth - 20, 20, { align: "right" });

  // ===== INVOICE BOX =====
  doc.setFillColor(248, 250, 252);
  doc.rect(pageWidth - 80, 25, 70, 40, "F");
  doc.setDrawColor(226, 232, 240);
  doc.rect(pageWidth - 80, 25, 70, 40, "S");

  const invoiceNumber = `INV-${order._id.slice(-6).toUpperCase()}`;
  const invoiceDate = new Date().toLocaleDateString();
  const dueDate = new Date(Date.now() + 30 * 86400000).toLocaleDateString();

  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice #:", pageWidth - 75, 33);
  doc.text("Date:", pageWidth - 75, 40);
  doc.text("Due:", pageWidth - 75, 47);
  doc.text("Order ID:", pageWidth - 75, 54);

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text(invoiceNumber, pageWidth - 40, 33);
  doc.text(invoiceDate, pageWidth - 40, 40);
  doc.text(dueDate, pageWidth - 40, 47);
  doc.text(`#${order._id.slice(-6).toUpperCase()}`, pageWidth - 40, 54);

  // ===== BILL TO =====
  let y = 80;
  doc.setTextColor(59, 130, 246);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("BILL TO", 20, y);

  doc.setFillColor(248, 250, 252);
  doc.rect(20, y + 5, 85, 40, "F");
  doc.setDrawColor(226, 232, 240);
  doc.rect(20, y + 5, 85, 40, "S");

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  y += 15;
  const customerName =
    order.user?.firstName && order.user?.lastName
      ? `${order.user.firstName} ${order.user.lastName}`
      : "Valued Customer";
  doc.text(customerName, 25, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  if (order.user?.email) {
    y += 6;
    doc.text(`Email: ${order.user.email}`, 25, y);
  }
  if (order.user?.phone) {
    y += 6;
    doc.text(`Phone: ${order.user.phone}`, 25, y);
  }

  // ===== SHIP TO =====
  if (order.shippingAddress) {
    doc.setTextColor(59, 130, 246);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("SHIP TO", 120, 80);

    doc.setFillColor(248, 250, 252);
    doc.rect(120, 85, 75, 40, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(120, 85, 75, 40, "S");

    let sy = 95;
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    if (order.shippingAddress.street) {
      doc.text(order.shippingAddress.street, 125, sy);
      sy += 5;
    }
    if (order.shippingAddress.city) {
      doc.text(order.shippingAddress.city, 125, sy);
      sy += 5;
    }
    if (order.shippingAddress.state) {
      doc.text(order.shippingAddress.state, 125, sy);
      sy += 5;
    }
    if (order.shippingAddress.postalCode) {
      doc.text(order.shippingAddress.postalCode, 125, sy);
      sy += 5;
    }

    if (order.shippingAddress.country) {
      doc.text(order.shippingAddress.country, 125, sy);
    }
  }

  // ===== ORDER DETAILS =====
  y = 140;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(59, 130, 246);
  doc.text("ORDER DETAILS", 20, y);
  y += 8;

  // Table Header
  // Table Header
  doc.setFillColor(59, 130, 246);
  doc.rect(20, y, pageWidth - 40, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text("Description", 25, y + 7);
  doc.text("Qty", pageWidth - 80, y + 7, { align: "center" });
  doc.text("Unit Price", pageWidth - 50, y + 7, { align: "center" });
  doc.text("Total", pageWidth - 25, y + 7, { align: "right" });

  // Move further below header
  y += 16;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  let subtotal = 0;

  order.items?.forEach((item: any, i: number) => {
    const itemTotal = item.quantity * item.price;
    subtotal += itemTotal;

    if (i % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(20, y - 6, pageWidth - 40, 8, "F");
    }

    doc.text(item.name, 25, y);
    doc.text(item.quantity.toString(), pageWidth - 80, y, { align: "center" });
    doc.text(`$${item.price.toFixed(2)}`, pageWidth - 50, y, {
      align: "center",
    });
    doc.text(`$${itemTotal.toFixed(2)}`, pageWidth - 25, y, { align: "right" });

    y += 8;
  });

  // Totals
  y += 10;
  doc.line(20, y, pageWidth - 20, y);
  y += 10;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  doc.setFontSize(10);
  doc.text("Subtotal:", pageWidth - 60, y);
  doc.text(`$${subtotal.toFixed(2)}`, pageWidth - 25, y, { align: "right" });
  y += 6;
  doc.text("Tax (8%):", pageWidth - 60, y);
  doc.text(`$${tax.toFixed(2)}`, pageWidth - 25, y, { align: "right" });
  y += 10;

  doc.setFillColor(59, 130, 246);
  doc.rect(pageWidth - 70, y - 6, 65, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL:", pageWidth - 65, y);
  doc.text(`$${total.toFixed(2)}`, pageWidth - 25, y, { align: "right" });

  // ===== FOOTER =====
  const footerY = pageHeight - 30;
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(1.5);
  doc.line(20, footerY, pageWidth - 20, footerY);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(59, 130, 246);
  doc.text("THANK YOU FOR YOUR BUSINESS!", pageWidth / 2, footerY + 8, {
    align: "center",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "For questions, contact us at infot@tiresdash.com",
    pageWidth / 2,
    footerY + 15,
    { align: "center" }
  );

  doc.save(`Invoice_${order._id.slice(-6).toUpperCase()}.pdf`);
};

const OrderCard = ({ order }: { order: any }) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="w-full hover:shadow-lg transition-all duration-300 border-1 border-gray-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold font-mono text-primary">
                #{order._id.slice(-8).toUpperCase()}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Order actions">
                <DropdownItem
                  key="view"
                  startContent={<Eye className="h-4 w-4" />}
                  onPress={() => router.push(`/profile/order/${order._id}`)}>
                  View Details
                </DropdownItem>
                <DropdownItem
                  key="invoice"
                  startContent={<Download className="h-4 w-4" />}
                  onPress={() => generateInvoice(order)}>
                  Download Invoice
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody className="pt-0 space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{order.user?.email || "N/A"}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{order.totalItems} items</span>
            </div>
            <span className="text-xl font-bold text-success">
              ${order.totalPrice?.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            <StatusChip
              status={order.status}
              type="order"
            />
            <StatusChip
              status={order.payment?.paymentStatus || "N/A"}
              type="payment"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span className="capitalize">
              {order.payment?.paymentMethod?.replace("_", " ") || "N/A"}
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              color="primary"
              variant="flat"
              startContent={<Eye className="h-4 w-4" />}
              onPress={() => router.push(`/profile/order/${order._id}`)}
              className="flex-1">
              View
            </Button>
            <Button
              size="sm"
              color="success"
              variant="flat"
              startContent={<Download className="h-4 w-4" />}
              onPress={() => generateInvoice(order)}
              className="flex-1">
              Invoice
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default function OrderTable({ orders }: any) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders =
    orders?.data?.filter((order: any) => {
      const matchesSearch =
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.firstName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    }) || [];

  const uniqueStatuses = [
    ...(new Set(orders?.data?.map((order: any) => order.status) || []) as any),
  ];

  const renderCell = (order: any, columnKey: string) => {
    switch (columnKey) {
      case "orderId":
        return (
          <span className="font-mono text-sm font-semibold text-primary">
            #{order._id.slice(-4).toUpperCase()}
          </span>
        );

      case "customer":
        return (
          <div className="flex flex-col gap-1">
            <div className="font-medium">
              {order.user?.firstName && order.user?.lastName
                ? `${order.user.firstName} ${order.user.lastName}`
                : "N/A"}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {order.user?.email || "N/A"}
            </div>
          </div>
        );

      case "totalPrice":
        return (
          <span className="font-bold text-lg text-success">
            ${order.totalPrice?.toFixed(2)}
          </span>
        );

      case "totalItems":
        return (
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{order.totalItems}</span>
          </div>
        );

      case "status":
        return (
          <StatusChip
            status={order.status}
            type="order"
          />
        );

      case "paymentStatus":
        return (
          <StatusChip
            status={order.payment?.paymentStatus || "N/A"}
            type="payment"
          />
        );

      case "paymentMethod":
        return (
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-500" />
            <span className="capitalize">
              {order.payment?.paymentMethod?.replace("_", " ") || "N/A"}
            </span>
          </div>
        );

      case "createdAt":
        return (
          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(order.createdAt).toLocaleTimeString()}
            </div>
          </div>
        );

      case "actions":
        return (
          <div className="flex justify-center gap-2">
            <Tooltip content="View">
              <Button
                isIconOnly
                size="sm"
                color="primary"
                variant="flat"
                onPress={() => router.push(`/profile/order/${order._id}`)}
                className="flex-1">
                <Eye className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Download Invoice">
              <Button
                isIconOnly
                size="sm"
                color="success"
                variant="light"
                onPress={() => generateInvoice(order)}>
                <Download className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-6 p-4">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-400 flex items-center gap-2">
              <Building2 className="h-8 w-8 " />
              Orders Management
            </h1>
            <p className="text-gray-500 mt-1">
              Track and manage customer orders efficiently
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
            <FileText className="h-4 w-4" />
            <span className="font-medium">{filteredOrders.length} orders</span>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search by order ID, email, or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Search className="h-4 w-4 text-gray-400" />}
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "bg-white border-2 border-gray-200 hover:border-primary-300",
              }}
            />
          </div>

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                startContent={<Filter className="h-4 w-4" />}
                className="min-w-[140px] justify-start">
                {statusFilter === "all" ? "All Status" : statusFilter}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Status filter"
              selectedKeys={[statusFilter]}
              onSelectionChange={(keys) =>
                setStatusFilter(Array.from(keys)[0] as string)
              }>
              <DropdownItem key="all">All Status</DropdownItem>
              {
                uniqueStatuses?.map((status: any) => (
                  <DropdownItem
                    key={status}
                    className="capitalize">
                    {status}
                  </DropdownItem>
                )) as any
              }
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Mobile Cards View (md and smaller) */}
      <div className="block xl:hidden">
        {filteredOrders.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredOrders.map((order: any) => (
              <OrderCard
                key={order._id}
                order={order}
              />
            ))}
          </div>
        ) : (
          <Card className="w-full">
            <CardBody className="flex flex-col items-center justify-center py-12">
              <Package className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500 text-center">
                {searchTerm || statusFilter !== "all"
                  ? "No orders match your current filters."
                  : "No orders have been placed yet."}
              </p>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Desktop Table View (lg and larger) */}
      <div className="hidden xl:block">
        <Card className="w-full">
          <CardBody className="p-0">
            {filteredOrders.length > 0 ? (
              <Table
                aria-label="Orders table"
                classNames={{
                  wrapper: "shadow-none",
                  th: "bg-gray-50 text-gray-700 font-semibold",
                  td: "py-4",
                }}>
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn
                      key={column.uid}
                      align={column.uid === "actions" ? "center" : "start"}
                      className="text-sm font-semibold">
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={filteredOrders}>
                  {(order: any) => (
                    <TableRow
                      key={order._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                      {(columnKey) => (
                        <TableCell>
                          {renderCell(order, columnKey as string)}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <Package className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-500 text-center">
                  {searchTerm || statusFilter !== "all"
                    ? "No orders match your current filters."
                    : "No orders have been placed yet."}
                </p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
