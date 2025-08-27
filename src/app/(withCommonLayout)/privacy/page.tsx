// app/privacy/page.tsx
"use client";

import React from "react";
import { Shield, User, Lock, Settings, FileText, Key } from "lucide-react";

const sections = [
  {
    icon: <Shield className="w-12 h-12 text-orange-500" />,
    title: "Your Privacy Matters",
    text: "We respect your privacy and ensure your personal information is protected at all times. We never sell your data to third parties.",
  },
  {
    icon: <User className="w-12 h-12 text-orange-500" />,
    title: "Information Collection",
    text: "We collect information to improve your experience, including account details, preferences, and browsing behavior.",
  },
  {
    icon: <Lock className="w-12 h-12 text-orange-500" />,
    title: "Secure Payments",
    text: "All payments are securely processed via PayPal and Stripe. Your financial data is encrypted and never stored on our servers.",
  },
  {
    icon: <Settings className="w-12 h-12 text-orange-500" />,
    title: "Cookies & Tracking",
    text: "We use cookies to enhance functionality and provide personalized experiences. You can manage your cookie settings anytime.",
  },
  {
    icon: <Key className="w-12 h-12 text-orange-500" />,
    title: "Your Rights",
    text: "You have full control over your data. You can access, modify, or request deletion of your information at any time.",
  },
  {
    icon: <FileText className="w-12 h-12 text-orange-500" />,
    title: "Policy Updates",
    text: "We may update our Privacy Policy from time to time. All changes will be posted here with the effective date for transparency.",
  },
];

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 py-32 text-center overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white z-10 relative">
          Privacy Policy
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-white z-10 relative text-lg md:text-xl">
          Protecting your information is our top priority. Learn how we collect,
          use, and safeguard your data at Tires Dash.
        </p>
        {/* Optional subtle pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none">
            <circle
              cx="50"
              cy="50"
              r="50"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-16 px-6 grid gap-12 md:grid-cols-2">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-start md:items-center p-6 rounded-3xl bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-30 backdrop-blur-md shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <div className="mr-6">{section.icon}</div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2 relative">
                {section.title}
                <span className="absolute left-0 -bottom-1 w-12 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"></span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{section.text}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default PrivacyPage;
