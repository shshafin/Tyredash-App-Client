import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TyresDash Fleet Program — Discounts, Priority Support & Fleet Card",
  description:
    "Join the TyresDash Fleet Program for exclusive discounts, priority appointments, a dedicated fleet card, and expert tire support. Built for modern fleets.",
  keywords:
    "fleet tires, tire discounts, fleet management, priority service, tire program, commercial tires",
  openGraph: {
    title: "TyresDash Fleet Program — Discounts, Priority Support & Fleet Card",
    description:
      "Join the TyresDash Fleet Program for exclusive discounts, priority appointments, a dedicated fleet card, and expert tire support. Built for modern fleets.",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg",
        width: 1200,
        height: 630,
        alt: "TyresDash Fleet Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TyresDash Fleet Program — Discounts, Priority Support & Fleet Card",
    description:
      "Join the TyresDash Fleet Program for exclusive discounts, priority appointments, a dedicated fleet card, and expert tire support. Built for modern fleets.",
    images: [
      "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg",
    ],
  },
  alternates: {
    canonical: "https://tyresdash.com/fleet",
  },
};

export default function FleetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TyresDash",
            url: "https://tyresdash.com",
            description:
              "Premium tire services and fleet programs for businesses and consumers",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-800-TYRES-DASH",
              contactType: "customer service",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
