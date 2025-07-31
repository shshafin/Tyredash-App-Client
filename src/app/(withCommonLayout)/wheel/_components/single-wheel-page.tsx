"use client"

import { useState } from "react"
import { useGetSingleWheel } from "@/src/hooks/wheel.hook"
import { useUser } from "@/src/context/user.provider"
import { Button } from "@heroui/button"
import { Card, CardBody } from "@heroui/card"
import { Chip } from "@heroui/chip"
import { Tabs, Tab } from "@heroui/tabs"
import { ShoppingCart, Heart, Star, Shield, Truck, ArrowLeft, Plus, Minus, Check, Info, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useAddItemToCart } from "@/src/hooks/cart.hook"
import { useAddItemToWishlist } from "@/src/hooks/wishlist.hook"
import { useGetProductReview, useCreateReview, useUpdateReview, useDeleteReview } from "@/src/hooks/review.hook"
import { redirect } from "next/navigation"

interface WheelData {
  _id: string
  name: string
  year: { year: number }
  make: { make: string; logo: string }
  model: { model: string }
  trim: { trim: string }
  tireSize: { tireSize: string }
  drivingType: { title: string; subTitle: string }
  brand: { name: string; logo: string; description: string }
  category: { name: string; image: string }
  description: string
  images: string[]
  price: number
  discountPrice: number
  stockQuantity: number
  warranty: string
  // Wheel specifications
  RimDiameter: number
  RimWidth: number
  boltPattern: string
  offset: number
  hubBoreSize: number
  numberOFBolts: number
  loadCapacity: number
  loadRating: number
  finish: string
  wheelColor: string
  materialType: string
  wheelSize: string
  wheelAccent: string
  wheelPieces: string
  wheelWidth: string
  wheelType: string
  // Additional info
  productLine: string[]
  conditionInfo: string
  unitName: string
  grossWeight: string
  GTIN: string
  ATVOffset: string
  BoltsQuantity: string
  hubBore: string
  constructionType: string
}

const SingleWheelPage = ({ params }: { params: { id: string } }) => {
  const { user } = useUser()
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useGetSingleWheel(params.id)
  const wheel: WheelData = data?.data

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { mutate: addToCart, isPending: addingToCart } = useAddItemToCart({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CART"] })
      toast.success("Added to cart successfully!")
    },
    onError: () => {
      toast.error("Failed to add to cart")
    },
    userId: user?._id,
  })

  const { mutate: addToWishlist, isPending: addingToWishlist } = useAddItemToWishlist({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_WISHLIST"] })
      toast.success("Added to wishlist!")
    },
    onError: () => {
      toast.error("Failed to add to wishlist")
    },
    userId: user?._id,
  })

  // Review hooks and state
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    refetch: refetchReview,
  } = useGetProductReview({ id: params.id, productType: "wheel" })
  const reviews = reviewsData?.data?.reviews || []
  const reviewStats = reviewsData?.data?.stats || { averageRating: 0, reviewCount: 0, ratingDistribution: {} }
  console.log({ reviewsData })

  const [showReviewForm, setShowReviewForm] = useState<boolean>(false)
  const [editingReview, setEditingReview] = useState<any>(null)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  })

  const { mutate: addReview, isPending: addingReview } = useCreateReview({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PRODUCT_REVIEWS"] })
      toast.success("Review added successfully!")
      setShowReviewForm(false)
      setReviewForm({ rating: 5, comment: "" })
    },
    onError: () => {
      toast.error("Failed to add review")
    },
  })

  const { mutate: updateReview, isPending: updatingReview } = useUpdateReview({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PRODUCT_REVIEWS"] })
      toast.success("Review updated successfully!")
      setEditingReview(null)
      setShowReviewForm(false)
      setReviewForm({ rating: 5, comment: "" })
    },
    onError: () => {
      toast.error("Failed to update review")
    },
  })

  const { mutate: deleteReview, isPending: deletingReview } = useDeleteReview({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PRODUCT_REVIEWS"] })
      toast.success("Review deleted successfully!")
    },
    onError: () => {
      toast.error("Failed to delete review")
    },
  })

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart")
      redirect(`/login?redirect=/wheel/${params.id}`)
      return
    }
    addToCart({
      productType: "wheel",
      productId: wheel._id,
      quantity: quantity,
    })
  }

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error("Please login to add items to wishlist")
      redirect(`/login?redirect=/wheel/${params.id}`)
      return
    }
    addToWishlist({
      productType: "wheel",
      product: wheel._id,
    })
  }

  const handleSubmitReview = () => {
    if (!user) {
      toast.error("Please login to add a review")
      return
    }

    if (editingReview) {
      updateReview({
        id: editingReview._id,
        data: {
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        },
      })
    } else {
      addReview({
        product: wheel._id,
        productType: "wheel",
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      })
    }
  }

  const handleEditReview = (review: any) => {
    setEditingReview(review)
    setReviewForm({
      rating: review.rating,
      comment: review.comment,
    })
    setShowReviewForm(true)
  }

  const handleDeleteReview = (reviewId: any) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteReview(reviewId)
    }
  }

  const handleCancelReview = () => {
    setShowReviewForm(false)
    setEditingReview(null)
    setReviewForm({ rating: 5, comment: "" })
  }

  const renderStars = (rating: any, interactive = false, onRatingChange: any = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const averageRating = reviewStats.averageRating || 0

  const discountPercentage = wheel?.discountPrice
    ? Math.round(((wheel.price - wheel.discountPrice) / wheel.price) * 100)
    : 0

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading wheel details...</p>
        </div>
      </div>
    )
  }

  if (isError || !wheel) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-red-500">Wheel not found</p>
        <Link href="/wheels">
          <Button>Back to Wheels</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/wheels">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Wheels
          </Button>
        </Link>
        <div className="text-sm text-gray-500">
          <span>Wheels</span> / <span>{wheel.brand.name}</span> / <span>{wheel.name}</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${wheel.images[selectedImage]}`}
              alt={wheel.name}
              fill
              className="object-cover"
            />
            {discountPercentage > 0 && (
              //   <Badge content={`${discountPercentage}% OFF`} color="danger" className="absolute top-4 left-4" />
              <Chip color="secondary">{`${discountPercentage}% OFF`}</Chip>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {wheel.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                  selectedImage === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
                  alt={`${wheel.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand and Category */}
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${wheel.brand.logo}`}
                alt={wheel.brand.name}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">{wheel.brand.name}</p>
              <Chip size="sm" variant="flat">
                {wheel.category.name}
              </Chip>
            </div>
          </div>

          {/* Title and Description */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{wheel.name}</h1>
            <p className="text-gray-600">{wheel.description}</p>
          </div>

          {/* Vehicle Compatibility */}
          <Card>
            <CardBody className="p-4">
              <h3 className="font-semibold mb-2">Vehicle Compatibility</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Year:</span> {wheel.year.year}
                </div>
                <div>
                  <span className="text-gray-500">Make:</span> {wheel.make.make}
                </div>
                <div>
                  <span className="text-gray-500">Model:</span> {wheel.model.model}
                </div>
                <div>
                  <span className="text-gray-500">Trim:</span> {wheel.trim.trim}
                </div>
                <div>
                  <span className="text-gray-500">Driving Type:</span> {wheel.drivingType.title}
                </div>
                <div>
                  <span className="text-gray-500">Tire Size:</span> {wheel.tireSize.tireSize}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Wheel Specifications */}
          <Card>
            <CardBody className="p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Wheel Specifications
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Rim Diameter:</span> {wheel.RimDiameter}"
                </div>
                <div>
                  <span className="text-gray-500">Rim Width:</span> {wheel.RimWidth}"
                </div>
                <div>
                  <span className="text-gray-500">Bolt Pattern:</span> {wheel.boltPattern}
                </div>
                <div>
                  <span className="text-gray-500">Offset:</span> {wheel.offset}mm
                </div>
                <div>
                  <span className="text-gray-500">Hub Bore:</span> {wheel.hubBoreSize}mm
                </div>
                <div>
                  <span className="text-gray-500">Number of Bolts:</span> {wheel.numberOFBolts}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {wheel.discountPrice ? (
                <>
                  <span className="text-3xl font-bold text-green-600">${wheel.discountPrice.toFixed(2)}</span>
                  <span className="text-xl text-gray-500 line-through">${wheel.price.toFixed(2)}</span>
                  <Chip color="danger" size="sm">
                    Save ${(wheel.price - wheel.discountPrice).toFixed(2)}
                  </Chip>
                </>
              ) : (
                <span className="text-3xl font-bold">${wheel.price.toFixed(2)}</span>
              )}
            </div>
            <p className="text-sm text-gray-500">Price per wheel</p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {wheel.stockQuantity > 0 ? (
              <>
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">In Stock ({wheel.stockQuantity} available)</span>
              </>
            ) : (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="bordered"
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                size="sm"
                variant="bordered"
                onPress={() => setQuantity(Math.min(wheel.stockQuantity, quantity + 1))}
                disabled={quantity >= wheel.stockQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1 gap-2 py-2 px-3 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg text-sm font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center"
              onPress={handleAddToCart}
              disabled={addingToCart || wheel.stockQuantity === 0}
            >
              <ShoppingCart className="h-5 w-5" />
              {addingToCart ? "Adding..." : "Add to Cart"}
            </Button>
            <Button variant="bordered" size="lg" onPress={handleAddToWishlist} disabled={addingToWishlist}>
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="text-sm">{wheel.warranty}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-green-500" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm">{wheel.conditionInfo}</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-gray-500" />
              <span className="text-sm">{wheel.productLine.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <div className="mt-12">
        <Tabs aria-label="Wheel Information" className="w-full">
          <Tab key="specifications" title="Specifications">
            <Card>
              <CardBody className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-4">Wheel Dimensions</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Rim Diameter:</span>
                        <span>{wheel.RimDiameter}"</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rim Width:</span>
                        <span>{wheel.RimWidth}"</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wheel Size:</span>
                        <span>{wheel.wheelSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wheel Width:</span>
                        <span>{wheel.wheelWidth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gross Weight:</span>
                        <span>{wheel.grossWeight} lbs</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Bolt Pattern & Fitment</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Bolt Pattern:</span>
                        <span>{wheel.boltPattern}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Number of Bolts:</span>
                        <span>{wheel.numberOFBolts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hub Bore Size:</span>
                        <span>{wheel.hubBoreSize}mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Offset:</span>
                        <span>{wheel.offset}mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ATV Offset:</span>
                        <span>{wheel.ATVOffset}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Design & Material</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Material Type:</span>
                        <span>{wheel.materialType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wheel Color:</span>
                        <span>{wheel.wheelColor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Finish:</span>
                        <span>{wheel.finish}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wheel Accent:</span>
                        <span>{wheel.wheelAccent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wheel Pieces:</span>
                        <span>{wheel.wheelPieces}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Performance & Ratings</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Load Capacity:</span>
                        <span>{wheel.loadCapacity} lbs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Load Rating:</span>
                        <span>{wheel.loadRating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wheel Type:</span>
                        <span>{wheel.wheelType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Construction Type:</span>
                        <span>{wheel.constructionType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GTIN:</span>
                        <span>{wheel.GTIN}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="warranty" title="Warranty & Support">
            <Card>
              <CardBody className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Warranty Information</h3>
                    <p>{wheel.warranty}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Brand Description</h3>
                    <p>{wheel.brand.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Product Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Unit Name:</span>
                        <span>{wheel.unitName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Condition:</span>
                        <span>{wheel.conditionInfo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Product Line:</span>
                        <span>{wheel.productLine.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="reviews" title={`Reviews (${reviewStats.reviewCount || 0})`}>
            <Card>
              <CardBody className="p-6">
                {/* Reviews Summary */}
                <div className="mb-6 pb-6 border-b">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-bold">{averageRating}</div>
                    <div>
                      {renderStars(Math.round(averageRating))}
                      <p className="text-sm text-gray-500 mt-1">
                        Based on {reviewStats.reviewCount || 0} review{reviewStats.reviewCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Rating Distribution */}
                  {/* {reviewStats.ratingDistribution && (
                    <div className="mt-4 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <div className="w-12 text-sm text-right">{rating} stars</div>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{
                                width: `${
                                  reviewStats.reviewCount
                                    ? (reviewStats.ratingDistribution[rating] / reviewStats.reviewCount) * 100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                          <div className="w-8 text-sm text-gray-500">{reviewStats.ratingDistribution[rating] || 0}</div>
                        </div>
                      ))}
                    </div>
                  )} */}

                  {user && !showReviewForm && (
                    <Button color="primary" onPress={() => setShowReviewForm(true)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Write a Review
                    </Button>
                  )}
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <Card className="mb-6">
                    <CardBody className="p-4">
                      <h3 className="font-semibold mb-4">{editingReview ? "Edit Review" : "Write a Review"}</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Rating</label>
                          {renderStars(reviewForm.rating, true, (rating: any) =>
                            setReviewForm((prev) => ({ ...prev, rating })),
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Comment</label>
                          <textarea
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm((prev) => ({ ...prev, comment: e.target.value }))}
                            placeholder="Share your experience with this wheel..."
                            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                            rows={4}
                            maxLength={500}
                          />
                          <p className="text-xs text-gray-500 mt-1">{reviewForm.comment.length}/500 characters</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            color="primary"
                            onPress={handleSubmitReview}
                            disabled={addingReview || updatingReview}
                          >
                            {addingReview || updatingReview
                              ? "Submitting..."
                              : editingReview
                                ? "Update Review"
                                : "Submit Review"}
                          </Button>
                          <Button variant="bordered" onPress={handleCancelReview}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviewsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p>Loading reviews...</p>
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No reviews yet. Be the first to review this wheel!</p>
                    </div>
                  ) : (
                    reviews.map((review: any) => (
                      <Card key={review._id} className="border">
                        <CardBody className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">{review.user?.firstName?.charAt(0) || "U"}</span>
                              </div>
                              <div>
                                <p className="font-medium">
                                  {review.user?.firstName + " " + review?.user?.lastName || "Anonymous"}
                                </p>
                                <div className="flex items-center gap-2">
                                  {renderStars(review.rating)}
                                  <span className="text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {user && user._id === review.user?._id && (
                              <div className="flex gap-2">
                                <Button size="sm" variant="light" onPress={() => handleEditReview(review)}>
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="light"
                                  color="danger"
                                  onPress={() => handleDeleteReview(review._id)}
                                  disabled={deletingReview}
                                >
                                  Delete
                                </Button>
                              </div>
                            )}
                          </div>

                          {review.comment && <p className="text-gray-700">{review.comment}</p>}
                        </CardBody>
                      </Card>
                    ))
                  )}
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default SingleWheelPage
