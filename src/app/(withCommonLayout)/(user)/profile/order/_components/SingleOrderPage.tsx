"use client"

import { useParams } from "next/navigation"
import { useGetSingleOrder } from "@/src/hooks/order.hook"
import { Button } from "@heroui/button"
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Chip } from "@heroui/chip"
import { ArrowLeft, Package, MapPin, CreditCard, Truck, Calendar, User, Mail, Phone } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Types based on your order model
interface OrderItem {
  product: string
  productType: string
  quantity: number
  price: number
  name: string
  thumbnail: string
}

interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface OrderUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
}

interface Payment {
  _id: string
  amount: number
  paymentMethod: string
  paymentStatus: string
  transactionId?: string
}

interface Order {
  _id: string
  user: OrderUser
  payment: Payment
  items: OrderItem[]
  totalPrice: number
  totalItems: number
  status: string
  shippingAddress: Address
  billingAddress: Address
  trackingNumber?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
}

// Status badge component
const StatusBadge = ({ status, type }: { status: string; type: "order" | "payment" }) => {
  const getStatusColor = (status: string, type: "order" | "payment") => {
    if (type === "order") {
      switch (status) {
        case "pending":
          return "warning"
        case "processing":
          return "primary"
        case "shipped":
          return "secondary"
        case "delivered":
          return "success"
        case "cancelled":
          return "danger"
        case "refunded":
          return "default"
        default:
          return "default"
      }
    } else {
      switch (status) {
        case "pending":
          return "warning"
        case "processing":
          return "primary"
        case "completed":
          return "success"
        case "failed":
          return "danger"
        case "refunded":
          return "default"
        case "cancelled":
          return "danger"
        default:
          return "default"
      }
    }
  }

  return (
    <Chip color={getStatusColor(status, type)} variant="flat" size="sm">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Chip>
  )
}

const SingleOrderPage = () => {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const { data: orderData, isLoading, isError } = useGetSingleOrder(orderId)
  const order: Order = orderData?.data

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    )
  }

  if (isError || !order) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-red-500">Order not found</p>
        <Button onPress={() => router.push("/admin/orders")}>Back to Orders</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onPress={() => router.push("/admin/orders")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Order Details</h1>
            <p className="text-gray-500 font-mono">#{order._id.slice(-8).toUpperCase()}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <StatusBadge status={order.status} type="order" />
          <StatusBadge status={order.payment.paymentStatus} type="payment" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Order Items ({order.totalItems})</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                      {item.thumbnail ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.thumbnail}`}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <Package className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{item.productType}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">each</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">total</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-1">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </CardBody>
          </Card>

          {/* Billing Address */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Billing Address</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-1">
                <p>{order.billingAddress.street}</p>
                <p>
                  {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}
                </p>
                <p>{order.billingAddress.country}</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Customer</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">
                    {order.user.firstName} {order.user.lastName}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">{order.user.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p className="text-sm">{order.user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-sm">{order.user.phone}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Payment</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="capitalize">{order.payment.paymentMethod.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <StatusBadge status={order.payment.paymentStatus} type="payment" />
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-semibold">${order.payment.amount.toFixed(2)}</span>
                </div>
                {order.payment.transactionId && (
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-mono text-sm">{order.payment.transactionId}</span>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${order.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Tracking Information */}
          {(order.trackingNumber || order.estimatedDelivery) && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Tracking</h2>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {order.trackingNumber && (
                    <div>
                      <p className="text-sm text-gray-500">Tracking Number:</p>
                      <p className="font-mono">{order.trackingNumber}</p>
                    </div>
                  )}
                  {order.estimatedDelivery && (
                    <div>
                      <p className="text-sm text-gray-500">Estimated Delivery:</p>
                      <p>{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          )}

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Timeline</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Order Placed:</p>
                  <p>{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated:</p>
                  <p>{new Date(order.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SingleOrderPage
