"use client"

import { useUser } from "@/src/context/user.provider"
import { useGetMyWishlist, useRemoveItemFromWishlist } from "@/src/hooks/wishlist.hook"
import { useAddItemToCart } from "@/src/hooks/cart.hook"
import { Button } from "@heroui/button"
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { useQueryClient } from "@tanstack/react-query"
import { Heart, ShoppingCart, Trash2, Loader2, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

const WishlistPage = () => {
  const queryClient = useQueryClient()
  const { user } = useUser()
  const { data, isLoading, isError } = useGetMyWishlist();

  const { items: wishlistItems = [], totalItems = 0 } = data?.data || {}
  console.log({data}, 'wishlist')
  const hasNoWishlist = !data?.data || !wishlistItems || wishlistItems.length === 0

  const { mutate: handleRemoveFromWishlist, isPending: removeFromWishlistPending } = useRemoveItemFromWishlist({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WISHLIST"] })
      toast.success("Item removed from wishlist")
    }
  })

  const { mutate: handleAddToCart, isPending: addToCartPending } = useAddItemToCart({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CART"] })
      toast.success("Item added to cart successfully")
    },
    userId: user?._id,
  })

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your wishlist...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-red-500">Failed to load wishlist</p>
        <Button onPress={() => queryClient.invalidateQueries({ queryKey: ["wishlist"] })}>Try Again</Button>
      </div>
    )
  }

  if (hasNoWishlist) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">Your Wishlist</h1>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
          <Heart className="mb-4 h-16 w-16 text-gray-400" />
          <h2 className="mb-2 text-xl font-semibold">Your wishlist is empty</h2>
          <p className="mb-6 text-center text-gray-500">
            Save items you love to your wishlist and add them to cart later.
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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <p className="text-gray-500">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlistItems?.map((item: any, index: number) => (
          <Card key={index} className="group relative overflow-hidden">
            {/* Remove from wishlist button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-white/80 p-0 opacity-0 transition-opacity group-hover:opacity-100"
              onPress={() =>
                handleRemoveFromWishlist({
                  productType: item.productType,
                  productId: item?.product?._id,
                })
              }
              disabled={removeFromWishlistPending}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>

            <CardHeader className="p-0">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.product?.images[0]}`}
                  alt={item?.product?.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </CardHeader>

            <CardBody className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg line-clamp-2">{item.product?.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{item.productType}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${item?.product?.price.toFixed(2)}</span>
                  {item?.product?.stockQuantity > 0 ? (
                    <span className="text-sm text-green-600">In Stock</span>
                  ) : (
                    <span className="text-sm text-red-500">Out of Stock</span>
                  )}
                </div>
              </div>
            </CardBody>

            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full gap-2"
                onPress={() =>
                  handleAddToCart({
                    productType: item.productType,
                    productId: item?.product?._id,
                    quantity: 1,
                  })
                }
                disabled={addToCartPending || item.availableStock === 0}
              >
                <ShoppingCart className="h-4 w-4" />
                {item.availableStock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Continue Shopping Section */}
      <div className="mt-12 text-center">
        <Link href="/">
          <Button variant="ghost" size="lg" className="gap-2">
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default WishlistPage
