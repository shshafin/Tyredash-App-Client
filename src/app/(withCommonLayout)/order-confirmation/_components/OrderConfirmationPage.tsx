import Link from 'next/link';
import { CheckCircle, ShoppingCart, PackageCheck } from 'lucide-react';

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! We’re processing your order and will update you soon.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            <ShoppingCart className="w-4 h-4" />
            Continue Shopping
          </Link>
          <Link href="/profile/order" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            <PackageCheck className="w-4 h-4" />
            See Your Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
