"use client"

import { PayPalButtons } from "@paypal/react-paypal-js"
import { Spinner } from "@heroui/spinner"
import { useState } from "react"
import { useCreatePayment, useVerifyPaypalPayment } from "@/src/hooks/payment.hook"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface PayPalPaymentButtonProps {
  amount: number
  paymentData: any
}

export default function PayPalPaymentButton({ amount, paymentData }: PayPalPaymentButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter();

   const {mutate: handleVerifyPaypalPayment} = useVerifyPaypalPayment({
    onSuccess: async(data: any) => {
      console.log(data, 'paypal_pay_verify');
      setLoading(false);
      router.push('/order-confirmation');
    },
    onError: async (error: any) => {
      toast.error(error.message || "Failed to verify payment!");
      setLoading(false);
    } 
  }); 

  const {mutate: handleCreatePayment} = useCreatePayment({
    onSuccess: async(data: any) => {
      console.log(data, 'paypal_pay');
      const {paymentId, orderId} = data.data || {};
      handleVerifyPaypalPayment({paymentId, orderId});
    },
    onError: async (error: any) => {
      toast.error(error.message || "Failed to create payment!");
      setLoading(false);
    } 
  });

  // Create order (PayPal will call this)
  const createOrder = (data: any, actions: any) => {
    // Save for later payment saving

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: "USD",
          },
        },
      ],
    })
  }

  // Approve order (after user approves payment on PayPal)
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      // After capture success, now save the payment
      handleCreatePayment({
        ...paymentData
      })
    })
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-3 rounded-lg text-sm">
        <div className="flex justify-between mb-1">
          <span>Amount to pay:</span>
          <span className="font-medium">${amount.toLocaleString()}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-6">
          <Spinner size="lg" color="primary" />
          <span className="ml-3">Processing your payment...</span>
        </div>
      ) : (
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
          disabled={loading}
        />
      )}

      <div className="text-xs text-gray-500 text-center">
        By clicking the PayPal button, you'll be redirected to PayPal to complete your payment securely.
      </div>
    </div>
  )
}
