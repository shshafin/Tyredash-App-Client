"use client"
import { useUser } from "@/src/context/user.provider"
import { useClearCart, useGetCartByUserId, useRemoveItemFromCart, useUpdateCartItem } from "@/src/hooks/cart.hook"
import { ITire } from "@/src/types"
import { Button } from "@heroui/button"
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

// Types for our cart data
interface CartItem {
  product: string
  productType: string
  quantity: number
  price: number
  name: string
  thumbnail: string
  productDetails: ITire
  availableStock: number
}

const CartPage = () => {
  const queryClient = useQueryClient()
  const { user } = useUser();
  const { data, isLoading, isError } = useGetCartByUserId(user?._id);
  
  // const cartItems = data?.data?.items;
  const {items: cartItems = [], totalItems=0, totalPrice=0} = data?.data || {};
  const { mutate: handleRemoveItemFromCart, isPending: removeFromCartPending } =
      useRemoveItemFromCart({
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["GET_CART"] });
          toast.success("Item removed from cart successfully");
        },
        userId: user?._id,
      });
      const { mutate: handleUpdateCartItem, isPending: updateCartItemPending } =
      useUpdateCartItem({
        userId: user?._id,
      });
  const { mutate: handleClearCart, isPending: clearCartPending } =
      useClearCart({
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["GET_CART"] });
          toast.success("Cart cleared successfully");
        },
        userId: user?._id,
      });   

  // Calculate cart totals
//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const subtotal = 0;
  const tax = subtotal * 0.08 // 8% tax rate
  const shipping = subtotal > 500 ? 0 : 50 // Free shipping over $500
  const total = subtotal + tax + shipping

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your cart...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-destructive">Failed to load cart</p>
        <Button onPress={() => queryClient.invalidateQueries({ queryKey: ["cart"] })}>Try Again</Button>
      </div>
    )
  }

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-center text-muted-foreground">
            Looks like you haven't added any tires or wheels to your cart yet.
          </p>
          <Link href="/">
            <Button size="lg" className="gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-5 rounded">
            <CardHeader>
              {/* <CardTitle></CardTitle> */}
              Cart Items ({cartItems?.length})
            </CardHeader>
            <CardBody className="grid gap-6">
              {cartItems?.map((item: CartItem, index: number) => (
                <div key={index} className="grid gap-4 sm:grid-cols-[120px_1fr] md:gap-6">
                  <div className="relative aspect-square h-[120px] overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.thumbnail}`}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{item.productType}</p>
                      </div>
                      <div className="text-right font-medium">${item.price.toFixed(2)}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                        //   variant="outline"
                        //   size="icon"
                        size="sm"
                          className="h-8 w-8"
                          onPress={()=>handleUpdateCartItem({productType: item.productType, productId: item.product, quantity: item.quantity-1})}
                          disabled={updateCartItemPending}
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                        //   variant="outline"
                          size="sm"
                          className="h-8 w-8"
                          onPress={()=>handleUpdateCartItem({productType: item.productType, productId: item.product, quantity: item.quantity+1})}
                          disabled={updateCartItemPending}
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-500"
                        // onClick={() => handleRemoveItem(item._id)}
                        onPress={()=>handleRemoveItemFromCart({productType: item.productType, productId: item.product})}
                        disabled={removeFromCartPending}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                  {/* <Separator className="col-span-full mt-2" /> */}
                </div>
              ))}
            </CardBody>
            <CardFooter className="justify-between">
              <Button>
                <Link href="/">Continue Shopping</Link>
              </Button>
              <Button
                variant="ghost"
                onPress={() => {
                  handleClearCart();
                }}
                disabled={clearCartPending}
              >
                {clearCartPending ? "Clearing..." : "Clear Cart"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="p-5 rounded">
            <CardHeader>
              Order Summary
            </CardHeader>
            <CardBody className="grid gap-4">
              {/* <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div> */}
              {/* <Separator /> */}
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              {/* {shipping > 0 && (
                <p className="text-sm text-muted-foreground">
                  Add ${(500 - subtotal).toFixed(2)} more to qualify for free shipping
                </p>
              )} */}
            </CardBody>
            <CardFooter>
              <Link href="/checkout">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <div className="mt-6 rounded-lg border p-4">
            <h3 className="mb-2 font-medium">We Accept</h3>
            <div className="flex gap-2">
              <div className="rounded bg-muted px-2 py-1 text-xs">Visa</div>
              <div className="rounded bg-muted px-2 py-1 text-xs">Mastercard</div>
              <div className="rounded bg-muted px-2 py-1 text-xs">Amex</div>
              <div className="rounded bg-muted px-2 py-1 text-xs">PayPal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
