"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Star,
  Shield,
  Clock,
  CreditCard,
  FileText,
  TrendingUp,
  MapPin,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Users,
  Award,
  Phone,
  Mail,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Reusable components
const CTAButton = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <Link
    href="http://fleet.tiresdash.com/register"
    target="_blank"
    rel="noopener noreferrer">
    <motion.span
      className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-4 focus:ring-red-500/30 focus:outline-none ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      {children}
      <ArrowRight className="ml-2 h-5 w-5" />
    </motion.span>
  </Link>
);

const SectionWrapper = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={fadeInUp}
      className={className}>
      {children}
    </motion.div>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <motion.div
    className="bg-white dark:bg-gray-950 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
    whileHover={{ y: -4, scale: 1.02 }}
    variants={fadeInUp}>
    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-red-600 dark:text-red-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

const TestimonialCard = ({
  name,
  role,
  company,
  quote,
  rating,
}: {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}) => (
  <motion.div
    className="bg-white dark:bg-gray-950 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
    whileHover={{ y: -2 }}
    variants={fadeInUp}>
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
        />
      ))}
    </div>
    <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{quote}"</p>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-950 rounded-full mr-3"></div>
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {role}, {company}
        </p>
      </div>
    </div>
  </motion.div>
);

const AccordionItem = ({
  title,
  content,
  isOpen,
  onClick,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <motion.div
    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
    initial={false}>
    <button
      onClick={onClick}
      className="w-full px-6 py-4 text-left bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-red-500">
      <span className="font-medium text-gray-900 dark:text-white">{title}</span>
      <ChevronDown
        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30">
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
      </div>
    </motion.div>
  </motion.div>
);

export default function FleetPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const benefits = [
    {
      icon: Shield,
      title: "Special Fleet Discounts",
      description:
        "Save up to 25% on premium tires with exclusive fleet pricing and bulk order discounts.",
    },
    {
      icon: Clock,
      title: "Priority Support Appointments",
      description:
        "Skip the wait with priority booking and dedicated service slots for your fleet vehicles.",
    },
    {
      icon: CreditCard,
      title: "Dedicated Fleet Card",
      description:
        "Streamline purchases with a dedicated fleet card and simplified charging privileges.",
    },
    {
      icon: FileText,
      title: "Consolidated Billing & Invoices",
      description:
        "Simplify accounting with consolidated monthly billing and detailed expense reporting.",
    },
    {
      icon: TrendingUp,
      title: "Real-World Performance Insights",
      description:
        "Track tire performance, wear patterns, and ROI with comprehensive fleet analytics.",
    },
    {
      icon: MapPin,
      title: "Nationwide Partner Network",
      description:
        "Access our network of certified partners across the country for consistent service.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fleet Manager",
      company: "Metro Logistics",
      quote:
        "TiresDash Fleet Program cut our tire costs by 30% and eliminated downtime with priority service.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Operations Director",
      company: "Swift Transport",
      quote:
        "The consolidated billing and performance insights have transformed how we manage our fleet.",
      rating: 5,
    },
    {
      name: "Lisa Rodriguez",
      role: "Maintenance Supervisor",
      company: "City Delivery Co",
      quote:
        "Priority appointments and dedicated support mean our vehicles are always road-ready.",
      rating: 5,
    },
  ];

  const faqItems = [
    {
      title: "What are the eligibility requirements for the Fleet Program?",
      content:
        "The Fleet Program is designed for businesses with 5 or more vehicles. We welcome transportation companies, delivery services, government fleets, and corporate vehicle programs.",
    },
    {
      title: "How does the pricing model work?",
      content:
        "Fleet pricing is based on volume and includes tiered discounts. The more vehicles in your fleet, the greater the savings. Contact our fleet specialists for a customized quote.",
    },
    {
      title: "What billing options are available?",
      content:
        "We offer flexible billing including monthly consolidated invoicing, net payment terms, and dedicated fleet card programs. All major business payment methods are accepted.",
    },
    {
      title: "How many locations do you service?",
      content:
        "Our network spans nationwide with certified partners in major metropolitan areas and key transportation corridors. Check our coverage map for specific locations.",
    },
    {
      title: "What are your support hours?",
      content:
        "Fleet customers receive priority support during extended hours: Monday-Friday 6 AM - 9 PM, Saturday 7 AM - 6 PM. Emergency roadside assistance is available 24/7.",
    },
    {
      title: "Can I cancel or modify my fleet membership?",
      content:
        "Fleet agreements are flexible with 30-day notice for modifications. No long-term contracts required. Contact your dedicated fleet manager for any changes.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-black dark:via-black dark:to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              variants={fadeInUp}>
              Power Your Fleet with{" "}
              <span className="text-red-600 dark:text-red-400">
                Premium Tires
              </span>{" "}
              & Priority Support
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
              variants={fadeInUp}>
              Cut downtime, control costs, and keep every vehicle road-ready
              with data-backed tire choices and priority service.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={fadeInUp}>
              <CTAButton>Join the Fleet Program</CTAButton>
              <Link href="#benefits">
                <motion.button
                  className="px-8 py-4 bg-white dark:bg-gray-950 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 font-semibold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400"
              variants={fadeInUp}>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span>Trusted by 75,000+ drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span>Secure payments</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 relative max-w-4xl mx-auto"
            variants={fadeIn}
            initial="initial"
            animate="animate">
            <div className="aspect-video bg-gray-200 dark:bg-gray-950 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg"
                alt="Fleet of vehicles with premium tires"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <SectionWrapper>
        <section
          id="benefits"
          className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Fleet Program Benefits
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything your fleet needs to stay productive, efficient, and
                profitable.
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="initial"
              animate="animate">
              {benefits.map((benefit, index) => (
                <FeatureCard
                  key={index}
                  {...benefit}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </SectionWrapper>

      {/* Comparison Table */}
      <SectionWrapper>
        <section className="py-24 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Fleet with TiresDash?
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">
                        Feature
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Standard
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Fleet Program
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      ["Pricing", "Standard rates", "Up to 25% discount"],
                      ["Support Speed", "24-48 hours", "Priority same-day"],
                      [
                        "Appointment Booking",
                        "Standard queue",
                        "Priority slots",
                      ],
                      [
                        "Dedicated Manager",
                        "Shared support",
                        "Personal fleet manager",
                      ],
                      ["Reporting", "Basic receipts", "Detailed analytics"],
                      [
                        "Warranty Handling",
                        "Standard process",
                        "Expedited claims",
                      ],
                    ].map(([feature, standard, fleet], index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-gray-50 dark:bg-gray-700/30"
                            : "bg-white dark:bg-gray-800"
                        }>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          {feature}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                          {standard}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {fleet}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Get started with your fleet program in four simple steps
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerChildren}
              initial="initial"
              animate="animate">
              {[
                {
                  title: "Apply Online",
                  description:
                    "Submit your fleet details and get instant pre-approval",
                },
                {
                  title: "Get Approved",
                  description:
                    "Receive your Fleet Card and account setup within 24 hours",
                },
                {
                  title: "Access Pricing",
                  description:
                    "Book priority service appointments and enjoy fleet discounts",
                },
                {
                  title: "Track Performance",
                  description:
                    "Monitor spend, performance, and savings through your dashboard",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeInUp}>
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper>
        <section className="py-24 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted by Fleet Managers
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                See what industry leaders say about our fleet program
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              variants={staggerChildren}
              initial="initial"
              animate="animate">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  {...testimonial}
                />
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid md:grid-cols-3 gap-8 text-center"
              variants={staggerChildren}
              initial="initial"
              animate="animate">
              {[
                { stat: "98%", label: "Uptime Improvement" },
                { stat: "$2,400", label: "Average Savings per Vehicle" },
                { stat: "9.2/10", label: "Customer Satisfaction" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}>
                  <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                    {item.stat}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <motion.div
              className="space-y-4"
              variants={staggerChildren}
              initial="initial"
              animate="animate">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  content={item.content}
                  isOpen={openAccordion === index}
                  onClick={() =>
                    setOpenAccordion(openAccordion === index ? null : index)
                  }
                />
              ))}
            </motion.div>
          </div>
        </section>
      </SectionWrapper>

      {/* Security & Payments */}
      <SectionWrapper>
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center items-center gap-8 mb-8">
              <Shield className="h-12 w-12 text-red-600 dark:text-red-400" />
              <CreditCard className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Secure & Trusted Payments
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your data is protected with enterprise-grade security. We accept
              all major payment methods and offer flexible billing terms for
              fleet customers.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-red-600 dark:hover:text-red-400">
                Privacy Policy
              </Link>
              {" • "}
              <Link
                href="/terms"
                className="hover:text-red-600 dark:hover:text-red-400">
                Terms of Service
              </Link>
              {" • "}
              <Link
                href="/refund"
                className="hover:text-red-600 dark:hover:text-red-400">
                Refund Policy
              </Link>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper>
        <section className="py-24 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Fleet?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Join thousands of fleet managers who trust TiresDash for their
              tire needs
            </p>
            <CTAButton className="bg-white text-red-600 hover:bg-gray-50 shadow-xl">
              Join the Fleet Program
            </CTAButton>
          </div>
        </section>
      </SectionWrapper>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 p-4 safe-area-inset-bottom z-50">
        <CTAButton className="w-full justify-center">
          Join the Fleet Program
        </CTAButton>
      </div>
    </div>
  );
}
