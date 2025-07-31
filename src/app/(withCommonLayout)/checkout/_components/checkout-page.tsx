"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@/src/context/user.provider"
import { useGetCartByUserId } from "@/src/hooks/cart.hook"
import { Button } from "@heroui/button"
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { Input } from "@heroui/input"
import { Checkbox } from "@heroui/checkbox"
import { ArrowLeft, CreditCard, Loader2, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Elements } from "@stripe/react-stripe-js"
import StripePaymentForm from "./payment/stripe-payment-form"
import { loadStripe } from "@stripe/stripe-js"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import PayPalPaymentButton from "./payment/paypal-payment-button"
import { useCreatePayment } from "@/src/hooks/payment.hook"
import { Spinner } from "@heroui/spinner"

// Types for our cart data
interface CartItem {
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

// Custom Label component since Hero UI doesn't have one
const Label = ({
  htmlFor,
  children,
  className = "",
}: { htmlFor: string; children: React.ReactNode; className?: string }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium mb-1 block ${className}`}>
      {children}
    </label>
  )
}

// Custom Separator component since Hero UI doesn't have one
const Separator = ({ className = "" }: { className?: string }) => {
  return <div className={`h-px bg-gray-200 my-4 ${className}`} />
}
// Initialize Stripe (in a real app, you would use your actual publishable key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

// PayPal options
const paypalOptions = {
  clientId: "YOUR_PAYPAL_CLIENT_ID",
  currency: "USD",
  intent: "capture",
}
const CheckoutPage = () => {
  const router = useRouter()
  const { user } = useUser()
  const { data, isLoading, isError } = useGetCartByUserId(user?._id)
  const { items: cartItems = [], totalItems = 0, totalPrice = 0, _id } = data?.data || {}

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sameAsBilling, setSameAsBilling] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("stripe")

  // Form state
  const [billingAddress, setBillingAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  })

  const [shippingAddress, setShippingAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  })

  // Update shipping address when "same as billing" is checked
  const updateBillingAddress = (field: keyof Address, value: string) => {
    const updatedAddress = { ...billingAddress, [field]: value }
    setBillingAddress(updatedAddress)

    if (sameAsBilling) {
      setShippingAddress(updatedAddress)
    }
  }

  const updateShippingAddress = (field: keyof Address, value: string) => {
    setShippingAddress({ ...shippingAddress, [field]: value })
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateAddresses()) {
      toast.error("Please fill in all required address fields")
      return
    }

    setIsSubmitting(true)

    try {
      // Here you would implement your order submission logic
      // This would typically be a call to your API to create an order
      // using the cart items and address information

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Order placed successfully!")
      router.push("/order-confirmation")
    } catch (error) {
      console.error("Error placing order:", error)
      toast.error("Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateAddresses = () => {
    const requiredBillingFields = Object.values(billingAddress).every((value) => value.trim() !== "")

    if (!requiredBillingFields) return false

    if (!sameAsBilling) {
      const requiredShippingFields = Object.values(shippingAddress).every((value) => value.trim() !== "")
      if (!requiredShippingFields) return false
    }

    return true
  }

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading checkout information...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-red-500">Failed to load cart information</p>
        <Button onPress={() => router.push("/cart")}>Return to Cart</Button>
      </div>
    )
  }

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
          <p className="mb-6 text-center text-gray-500">
            Your cart is empty. Please add items to your cart before proceeding to checkout.
          </p>
          <Link href="/">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center">
        <Link href="/cart">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Button>
        </Link>
        <h1 className="ml-4 text-3xl font-bold">Checkout</h1>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="grid gap-8">
              {/* Billing Address */}
              <Card className="p-5 rounded">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Billing Address</h2>
                </CardHeader>
                <CardBody className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="billing-street">Street Address*</Label>
                      <Input
                        id="billing-street"
                        value={billingAddress.street}
                        onChange={(e) => updateBillingAddress("street", e.target.value)}
                        required
                        placeholder="Street Address"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="billing-city">City*</Label>
                      <Input
                        id="billing-city"
                        value={billingAddress.city}
                        onChange={(e) => updateBillingAddress("city", e.target.value)}
                        required
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="grid gap-2">
                      <Label htmlFor="billing-state">State/Province*</Label>
                      <Input
                        id="billing-state"
                        value={billingAddress.state}
                        onChange={(e) => updateBillingAddress("state", e.target.value)}
                        required
                        placeholder="State"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="billing-postal">Postal Code*</Label>
                      <Input
                        id="billing-postal"
                        value={billingAddress.postalCode}
                        onChange={(e) => updateBillingAddress("postalCode", e.target.value)}
                        required
                        placeholder="Postal Code"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="billing-country">Country*</Label>
                      <Input
                          id="billing-country"
                          value={billingAddress.country}
                          onChange={(e) => updateBillingAddress("country", e.target.value)}
                          required
                          placeholder="Country"
                        />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Checkbox
                      id="same-address"
                      checked={sameAsBilling}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setSameAsBilling(checked)
                        if (checked) {
                          setShippingAddress(billingAddress)
                        }
                      }}
                    />
                    <label htmlFor="same-address" className="text-sm">
                      Shipping address same as billing
                    </label>
                  </div>
                </CardBody>
              </Card>

              {/* Shipping Address (only shown if different from billing) */}
              {!sameAsBilling && (
                <Card className="p-5 rounded">
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Shipping Address</h2>
                  </CardHeader>
                  <CardBody className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="shipping-street">Street Address*</Label>
                        <Input
                          id="shipping-street"
                          value={shippingAddress.street}
                          onChange={(e) => updateShippingAddress("street", e.target.value)}
                          required
                          placeholder="Street Address"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="shipping-city">City*</Label>
                        <Input
                          id="shipping-city"
                          value={shippingAddress.city}
                          onChange={(e) => updateShippingAddress("city", e.target.value)}
                          required
                          placeholder="City"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="grid gap-2">
                        <Label htmlFor="shipping-state">State/Province*</Label>
                        <Input
                          id="shipping-state"
                          value={shippingAddress.state}
                          onChange={(e) => updateShippingAddress("state", e.target.value)}
                          required
                          placeholder="State"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="shipping-postal">Postal Code*</Label>
                        <Input
                          id="shipping-postal"
                          value={shippingAddress.postalCode}
                          onChange={(e) => updateShippingAddress("postalCode", e.target.value)}
                          required
                          placeholder="Postal Code"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="shipping-country">Country*</Label>
                        <Input
                          id="shipping-country"
                          value={shippingAddress.country}
                          onChange={(e) => updateShippingAddress("country", e.target.value)}
                          required
                          placeholder="Country"
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="p-5 rounded sticky top-4">
              <CardHeader>
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </CardHeader>
              <CardBody className="grid gap-4">
                <div className="max-h-[300px] overflow-auto">
                  {cartItems.map((item: CartItem, index: number) => (
                    <div key={index} className="flex items-center gap-4 py-2">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.thumbnail}`}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
                {/* Payment Method */}
              <Card className="p-5 rounded">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                </CardHeader>
                <CardBody className="grid gap-4">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="stripe"
                        name="payment-method"
                        value="stripe"
                        checked={paymentMethod === "stripe"}
                        onChange={() => setPaymentMethod("stripe")}
                        className="h-4 w-4"
                      />
                      <label htmlFor="stripe" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Credit Card
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="paypal"
                        name="payment-method"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                        className="h-4 w-4"
                      />
                      <label htmlFor="paypal">PayPal</label>
                    </div>
                  </div>
                </CardBody>
              </Card>
              </CardBody>
              <CardFooter>
                {
                  paymentMethod === 'stripe' && (
                    <StripeButton 
                      amount={totalPrice.toFixed(2)}
                      paymentData={
                            {
                              cartId: _id,
                              shippingAddress,
                              billingAddress,
                              paymentMethod,
                            }
                      }
                      isDisabled={!validateAddresses()}
                      />
                  )
                }
                {
                  paymentMethod === 'paypal' && (
                    <PaypalCheckoutButton 
                      amount={totalPrice.toFixed(2)}
                      paymentData={
                            {
                              cartId: _id,
                              shippingAddress,
                              billingAddress,
                              paymentMethod,
                            }
                          }
                          isDisabled={!validateAddresses()}
                      />
                  )
                }
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutPage

const StripeButton = ({ amount, paymentData, isDisabled }: any) => {
  const router = useRouter();
    const {mutate: handleCreatePayment, isPending: isCreatingPayment} = useCreatePayment({
      onSuccess: async(data: any) => {
        console.log(data, 'stripe_pay');
        const {paymentId, sessionId, url} = data.data || {};
         window.location.href = url;
      },
      onError: async (error: any) => {
        toast.error(error.message || "Failed to create payment!");
        router.push('/payment/cancel');
      } 
    });
  return (
    <Button
            color="primary"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isCreatingPayment || isDisabled}
            onPress={()=>{
              handleCreatePayment({...paymentData});
            }}
          >
            {isCreatingPayment ? (
              <div className="flex items-center justify-center">
                <Spinner size="sm" color="white" className="mr-2" />
                Processing...
              </div>
            ) : (
              `Pay $${amount.toLocaleString()}`
            )}
          </Button>
  )
}

const PaypalCheckoutButton = ({ amount, paymentData, isDisabled }: any) => {
  const router = useRouter();
    const {mutate: handleCreatePayment, isPending: isCreatingPayment} = useCreatePayment({
      onSuccess: async(data: any) => {
        const approvalLink = data.links.find(
          (link: any) => link.rel === "approve"
        );
        if (approvalLink) {
          window.location.href = approvalLink.href;
        } else {
          alert("Approval link not found.");
        }
      },
      onError: async (error: any) => {
        toast.error(error.message || "Failed to create payment!");
        router.push('/payment/cancel');
      } 
    });

  return (
    <Button 
    color="primary"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isCreatingPayment || isDisabled}
            onPress={()=>{
              handleCreatePayment({...paymentData});
            }}
    >
      {isCreatingPayment ? "Redirecting..." : `Pay $${amount.toLocaleString()} with Paypal`}
    </Button>
  );
};
