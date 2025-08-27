// app/faq/page.tsx
"use client";

import React, { useState } from "react";
import {
  Shield,
  User,
  Lock,
  Settings,
  Key,
  FileText,
  Truck,
  Calendar,
  DollarSign,
  Phone,
} from "lucide-react";

const faqs = [
  {
    icon: <Shield className="w-8 h-8 text-orange-500" />,
    question: "What types of tires do you sell?",
    answer:
      "We sell car, SUV, truck, and performance tires from top brands with manufacturer warranties.",
  },
  {
    icon: <User className="w-8 h-8 text-orange-500" />,
    question: "Do you provide wheel servicing?",
    answer:
      "Yes, we offer wheel alignment, balancing, and rotation services with certified technicians.",
  },
  {
    icon: <Lock className="w-8 h-8 text-orange-500" />,
    question: "What payment methods are accepted?",
    answer:
      "We accept secure payments via PayPal and Stripe. Your financial data is encrypted and never stored.",
  },
  {
    icon: <Settings className="w-8 h-8 text-orange-500" />,
    question: "Can I return or exchange tires?",
    answer:
      "Returns and exchanges are allowed within 7 days of purchase according to our policy.",
  },
  {
    icon: <Key className="w-8 h-8 text-orange-500" />,
    question: "How do you protect my personal information?",
    answer:
      "All personal data is securely stored. We never sell your data to third parties.",
  },
  {
    icon: <FileText className="w-8 h-8 text-orange-500" />,
    question: "Do you offer installation at home?",
    answer:
      "Currently, installations are done at our service centers. Home installation coming soon.",
  },
  {
    icon: <Truck className="w-8 h-8 text-orange-500" />,
    question: "Do you offer fleet services for companies?",
    answer:
      "Yes, we provide dedicated fleet tire and wheel services including bulk orders, maintenance schedules, and special pricing.",
  },
  {
    icon: <Calendar className="w-8 h-8 text-orange-500" />,
    question: "Can I book an appointment online?",
    answer:
      "Absolutely! Use our online booking system to schedule servicing or consultation at your convenience.",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-orange-500" />,
    question: "Do you provide bulk order discounts?",
    answer:
      "Yes, for corporate clients, fleet services, or bulk purchases, we offer competitive discounts. Contact support for details.",
  },
  {
    icon: <Phone className="w-8 h-8 text-orange-500" />,
    question: "How can I contact customer support?",
    answer:
      "You can reach us via our contact page, email, or phone. Our support team is ready to assist you promptly.",
  },
];

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-500">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 py-28 text-center relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-white text-lg md:text-xl drop-shadow-sm">
          Get answers to the most important questions about Tires Dash services,
          fleet, and support.
        </p>
        {/* Optional subtle glow */}
        <div className="absolute inset-0 opacity-10">
          <div className="bg-gradient-to-tr from-yellow-300 via-orange-300 to-red-400 w-full h-full mix-blend-soft-light"></div>
        </div>
      </header>

      {/* FAQ Cards */}
      <main className="max-w-6xl mx-auto py-20 px-6 grid gap-6 md:grid-cols-2">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            onClick={() => toggleIndex(idx)}
            className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
            <div className="flex items-center space-x-4">
              {faq.icon}
              <h2 className="text-xl md:text-2xl font-semibold text-orange-600 dark:text-orange-400 group-hover:text-orange-500 transition-colors duration-300">
                {faq.question}
              </h2>
            </div>
            {openIndex === idx && (
              <p className="mt-3 text-gray-700 dark:text-gray-300 text-base">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default FaqPage;
