"use client";

import { useParams } from "next/navigation";
import { useGetSingleOrder } from "@/src/hooks/order.hook";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Badge } from "@heroui/badge";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Truck,
  Calendar,
  User,
  Mail,
  Phone,
  Copy,
  Download,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

// Types based on your order model
interface OrderItem {
  product: string;
  productType: string;
  quantity: number;
  price: number;
  name: string;
  thumbnail: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface OrderUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

interface Payment {
  _id: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionId?: string;
}

interface Order {
  _id: string;
  user: OrderUser;
  payment: Payment;
  items: OrderItem[];
  totalPrice: number;
  totalItems: number;
  status: string;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

// Enhanced Status badge component
const StatusBadge = ({
  status,
  type,
  size = "sm",
}: {
  status: string;
  type: "order" | "payment";
  size?: "sm" | "md" | "lg";
}) => {
  const getStatusConfig = (status: string, type: "order" | "payment") => {
    if (type === "order") {
      switch (status) {
        case "pending":
          return {
            color: "warning",
            icon: Clock,
            bg: "bg-amber-50 dark:bg-amber-950/30",
          };
        case "processing":
          return {
            color: "primary",
            icon: RefreshCw,
            bg: "bg-blue-50 dark:bg-blue-950/30",
          };
        case "shipped":
          return {
            color: "secondary",
            icon: Truck,
            bg: "bg-violet-50 dark:bg-violet-950/30",
          };
        case "delivered":
          return {
            color: "success",
            icon: CheckCircle,
            bg: "bg-green-50 dark:bg-green-950/30",
          };
        case "cancelled":
          return {
            color: "danger",
            icon: XCircle,
            bg: "bg-red-50 dark:bg-red-950/30",
          };
        case "refunded":
          return {
            color: "default",
            icon: RefreshCw,
            bg: "bg-gray-50 dark:bg-gray-950/30",
          };
        default:
          return {
            color: "default",
            icon: AlertCircle,
            bg: "bg-gray-50 dark:bg-gray-950/30",
          };
      }
    } else {
      switch (status) {
        case "pending":
          return {
            color: "warning",
            icon: Clock,
            bg: "bg-amber-50 dark:bg-amber-950/30",
          };
        case "processing":
          return {
            color: "primary",
            icon: RefreshCw,
            bg: "bg-blue-50 dark:bg-blue-950/30",
          };
        case "completed":
          return {
            color: "success",
            icon: CheckCircle,
            bg: "bg-green-50 dark:bg-green-950/30",
          };
        case "failed":
          return {
            color: "danger",
            icon: XCircle,
            bg: "bg-red-50 dark:bg-red-950/30",
          };
        case "refunded":
          return {
            color: "default",
            icon: RefreshCw,
            bg: "bg-gray-50 dark:bg-gray-950/30",
          };
        case "cancelled":
          return {
            color: "danger",
            icon: XCircle,
            bg: "bg-red-50 dark:bg-red-950/30",
          };
        default:
          return {
            color: "default",
            icon: AlertCircle,
            bg: "bg-gray-50 dark:bg-gray-950/30",
          };
      }
    }
  };

  const config = getStatusConfig(status, type);
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg} border border-current/20`}>
      <Icon className="h-3 w-3" />
      <span className="text-sm font-medium capitalize">
        {status.replace("_", " ")}
      </span>
    </div>
  );
};

// Loading component
const LoadingSpinner = () => (
  <div className="flex h-[60vh] items-center justify-center">
    <div className="text-center space-y-4">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium">Loading order details...</p>
        <p className="text-sm text-gray-500">
          Please wait while we fetch the information
        </p>
      </div>
    </div>
  </div>
);

// Error component
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex h-[60vh] flex-col items-center justify-center gap-6">
    <div className="text-center space-y-3">
      <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center">
        <XCircle className="h-8 w-8 text-red-500" />
      </div>
      <h2 className="text-2xl font-semibold">Order not found</h2>
      <p className="text-gray-500 max-w-md">
        We couldn't find the order you're looking for. It may have been removed
        or doesn't exist.
      </p>
    </div>
    <div className="flex gap-3">
      <Button
        onPress={onRetry}
        variant="ghost">
        Try Again
      </Button>
      <Button onPress={() => window.history.back()}>Go Back</Button>
    </div>
  </div>
);

const SingleOrderPage = () => {
  const params = useParams();
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);
  const orderId = params.id as string;

  const {
    data: orderData,
    isLoading,
    isError,
    refetch,
  } = useGetSingleOrder(orderId);
  const order: Order = orderData?.data;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard successfully.");
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        toast.success("Text copied to clipboard successfully.");
      } catch (fallbackErr) {
        toast.error("Failed to copy text to clipboard.");
      }
      document.body.removeChild(textArea);
    }
  };

  const handleExportPDF = async () => {
    if (!printRef.current) return;

    try {
      toast("Generating PDF, please wait...", { duration: 4000 });

      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`order-${order._id.slice(-8).toUpperCase()}.pdf`);

      toast.success("Order details have been exported successfully.");
    } catch (error) {
      toast.error("Failed to export order details.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !order) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl"
        ref={printRef}>
        {/* Enhanced Header */}
        <div className="mb-8 space-y-4">
          {/* Navigation */}
          <Button
            variant="ghost"
            onPress={() => router.push("/admin/order")}
            className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>

          {/* Title Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Order Details
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="solid"
                  className="font-mono text-xs sm:text-sm px-3 py-1">
                  #{order._id.slice(-8).toUpperCase()}
                </Badge>
                <button
                  onClick={() => copyToClipboard(order._id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex gap-2">
                <StatusBadge
                  status={order.status}
                  type="order"
                />
                <StatusBadge
                  status={order.payment.paymentStatus}
                  type="payment"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-2"
                  onClick={handleExportPDF}>
                  <Download className="h-4 w-4" />
                  Export
                </Button>

                <Button
                  size="sm"
                  onPress={() => router.push("/admin/order")}
                  variant="ghost"
                  className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Total Items
              </div>
              <div className="text-lg sm:text-xl font-semibold">
                {order.totalItems}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Total Amount
              </div>
              <div className="text-lg sm:text-xl font-semibold">
                ${order.totalPrice.toFixed(2)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Order Date
              </div>
              <div className="text-sm sm:text-base font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Payment Method
              </div>
              <div className="text-sm sm:text-base font-medium capitalize">
                {order.payment.paymentMethod.replace("_", " ")}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Order Items */}
            <Card className="overflow-hidden border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/50 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Order Items</h2>
                      <p className="text-sm text-gray-500">
                        {order.totalItems} items in this order
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="p-0">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex-shrink-0">
                          {item.thumbnail ? (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.thumbnail}`}
                              alt={item.name}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-110"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              <Package className="h-8 w-8" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 capitalize">
                              {item.productType}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">Qty:</span>
                              <span className="font-medium">
                                {item.quantity}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">Price:</span>
                              <span className="font-medium">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="text-right space-y-1 flex-shrink-0">
                          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4 sm:p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Order Total</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Addresses */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Shipping Address */}
              <Card className="border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-950/50 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        Shipping Address
                      </h2>
                      <p className="text-sm text-gray-500">Delivery location</p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {order.shippingAddress.street}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {order.shippingAddress.postalCode}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </CardBody>
              </Card>

              {/* Billing Address */}
              <Card className="border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950/50 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Billing Address</h2>
                      <p className="text-sm text-gray-500">Payment address</p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {order.billingAddress.street}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {order.billingAddress.city}, {order.billingAddress.state}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {order.billingAddress.postalCode}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {order.billingAddress.country}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Customer Information */}
            <Card className="border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-950/50 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Customer</h2>
                    <p className="text-sm text-gray-500">Account information</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                    {order.user.firstName.charAt(0)}
                    {order.user.lastName.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    {order.user.firstName} {order.user.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {order.user.role}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <p className="text-sm break-all">{order.user.email}</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                    <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <p className="text-sm">{order.user.phone}</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Payment Information */}
            <Card className="border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Payment</h2>
                    <p className="text-sm text-gray-500">Transaction details</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Method
                    </span>
                    <span className="font-medium capitalize">
                      {order.payment.paymentMethod.replace("_", " ")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Status
                    </span>
                    <StatusBadge
                      status={order.payment.paymentStatus}
                      type="payment"
                    />
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      Total Amount
                    </span>
                    <span className="font-bold text-lg text-blue-700 dark:text-blue-300">
                      ${order.payment.amount.toFixed(2)}
                    </span>
                  </div>

                  {order.payment.transactionId && (
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Transaction ID
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(order.payment.transactionId!)
                          }
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-mono text-sm break-all">
                        {order.payment.transactionId}
                      </p>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Tracking Information */}
            {(order.trackingNumber || order.estimatedDelivery) && (
              <Card className="border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950/50 rounded-lg flex items-center justify-center">
                      <Truck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Tracking</h2>
                      <p className="text-sm text-gray-500">
                        Shipment information
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="space-y-4">
                  {order.trackingNumber && (
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Tracking Number
                      </p>
                      <p className="font-mono font-medium">
                        {order.trackingNumber}
                      </p>
                    </div>
                  )}
                  {order.estimatedDelivery && (
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-700 dark:text-green-300 mb-1">
                        Estimated Delivery
                      </p>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        {new Date(order.estimatedDelivery).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            )}

            {/* Order Timeline */}
            <Card className="border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 dark:bg-rose-950/50 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Timeline</h2>
                    <p className="text-sm text-gray-500">Order history</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Order Placed
                      </p>
                      <p className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last Updated
                      </p>
                      <p className="font-medium">
                        {new Date(order.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
