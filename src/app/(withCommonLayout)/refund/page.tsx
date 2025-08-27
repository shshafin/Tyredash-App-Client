// app/refund/page.tsx
"use client";

import React from "react";

const RefundPage: React.FC = () => {
  const policies = [
    {
      title: "1. Overview",
      text: "At Tires Dash, we strive for customer satisfaction. This Refund Policy outlines the conditions under which refunds may be issued for products and services.",
    },
    {
      title: "2. Eligibility for Refunds",
      text: "Refunds are applicable if the product is defective, damaged during shipping, or does not match the description. Products must be returned within 7 days of delivery.",
    },
    {
      title: "3. Non-refundable Items",
      text: "Custom orders, used tires, and products damaged due to misuse are not eligible for refunds.",
    },
    {
      title: "4. Refund Process",
      text: "To request a refund, contact our support team with your order details. Once approved, refunds are processed to the original payment method within 5–7 business days.",
    },
    {
      title: "5. Shipping Costs",
      text: "Shipping costs are non-refundable unless the product was received damaged or incorrect.",
    },
    {
      title: "6. Contact Us",
      text: "For any questions regarding refunds, please reach out via our contact page or email info@tiresdash.com.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-500">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 py-28 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Refund Policy
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-white text-lg md:text-xl drop-shadow-sm">
          Understanding our refund terms ensures a smooth and hassle-free
          experience.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-16 px-6 space-y-6">
        {policies.map((policy, idx) => (
          <section
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold text-orange-600 dark:text-orange-400 mb-3">
              {policy.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{policy.text}</p>
          </section>
        ))}
      </main>
    </div>
  );
};

export default RefundPage;
