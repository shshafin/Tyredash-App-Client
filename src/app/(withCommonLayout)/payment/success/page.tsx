"use client";
import {
  useGetSinglePayment,
  useVerifyPaypalPayment,
  useVerifyStripePayment,
} from "@/src/hooks/payment.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get("paymentId");
  const {
    data: payment,
    isLoading,
    isError,
  } = useGetSinglePayment(paymentId as string);
  const paymentData = payment?.data;
  const sessionId = paymentData?.paymentDetails?.sessionId;
  const orderId = paymentData?.paymentDetails?.orderId;
  const paymentMethod = paymentData?.paymentMethod;

  const { mutate: verifyStripe } = useVerifyStripePayment({
    onSuccess: () => {
      router.push("/order-confirmation");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to verify Stripe payment");
      router.push("/payment/cancel");
    },
  });

  const { mutate: verifyPaypal } = useVerifyPaypalPayment({
    onSuccess: () => {
      router.push("/order-confirmation");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to verify PayPal payment");
      router.push("/payment/cancel");
    },
  });

  useEffect(() => {
    if (!paymentId || !paymentData) return;

    if (paymentMethod === "stripe" && sessionId) {
      verifyStripe({ paymentId, sessionId });
    } else if (paymentMethod === "paypal" && orderId) {
      verifyPaypal({ paymentId, orderId });
    } else {
      toast.error("Invalid payment method or missing ID.");
      router.push("/payment/cancel");
    }
  }, [paymentId, paymentMethod, sessionId, orderId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <svg
            className="animate-spin h-10 w-10 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Verifying Your Payment
        </h2>
        <p className="text-gray-600">
          Please wait while we confirm your transaction. This won’t take long.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
