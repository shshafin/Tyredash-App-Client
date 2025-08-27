// app/terms/page.tsx
"use client";

import React from "react";

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-500">
      {/* Header Section with Curve */}
      <header className="relative bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 py-28 text-center shadow-md dark:shadow-none overflow-hidden rounded-b-[5rem]">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Terms & Conditions
        </h1>
        <p className="mt-4 text-white max-w-2xl mx-auto">
          Welcome to Tires Dash. By using our website and services, you agree to
          our terms. Please read them carefully.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-8 space-y-8 mt-4">
        {[
          {
            title: "1. Introduction",
            text: "At Tires Dash, we provide top-notch tire and wheel services. By accessing our website, purchasing products, or using our services, you agree to comply with these Terms & Conditions.",
          },
          {
            title: "2. Services & Products",
            text: "We sell tires and wheels and provide servicing for all types. All payments are processed securely via PayPal and Stripe. Prices and availability are subject to change without notice.",
          },
          {
            title: "3. Payment & Refund",
            text: "Payments must be completed via PayPal or Stripe. Refunds are handled on a case-by-case basis according to our refund policy. Please contact support for any issues.",
          },
          {
            title: "4. User Responsibilities",
            text: "Users are responsible for providing accurate information during checkout and using the website responsibly. Misuse of services may result in account suspension.",
          },
          {
            title: "5. Limitation of Liability",
            text: "Tires Dash is not liable for indirect, incidental, or consequential damages arising from the use of our products or services.",
          },
        ].map((section, idx) => (
          <section
            key={idx}
            className="p-6 rounded-2xl border border-orange-400 dark:border-orange-500 bg-orange-50 dark:bg-gray-800 transition-colors duration-500 shadow-lg">
            <h2 className="text-2xl font-semibold text-orange-600 dark:text-orange-300 mb-4">
              {section.title}
            </h2>
            <p>{section.text}</p>
          </section>
        ))}
      </main>
    </div>
  );
};

export default TermsPage;
