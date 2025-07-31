export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "TIRESDASH",
  description:
    "TiresDash is a website that helps people find their lost tyres.",
  navItems: [
    {
      label: "TIRES",
      href: "/tire",
      hasDropdown: true,
    },
    {
      label: "WHEELS",
      href: "/wheel",
      hasDropdown: true,
    },
    {
      label: "ACCESSORIES",
      href: "/accessories",
      // hasDropdown: true,
    },
    {
      label: "APPOINTMENT",
      href: "/appointment",
    },
    {
      label: "TIPS & GUIDE",
      href: "/tips-guide",
    },
    {
      label: "FINANCING",
      href: "/financing",
      // hasDropdown: true,
    },
    {
      label: "FLEET",
      href: "/fleet",
    },
    {
      label: "DEALS",
      href: "/deals",
    },
  ],
  navMenuItems: [
    {
      label: "TIRES",
      href: "/tire",
      hasDropdown: true,
    },
    {
      label: "WHEELS",
      href: "/wheel",
      hasDropdown: true,
    },
    {
      label: "ACCESSORIES",
      href: "/accessories",
      // hasDropdown: true,
    },
    {
      label: "APPOINTMENT",
      href: "/appointment",
    },
    {
      label: "TIPS & GUIDE",
      href: "/tips-guide",
    },
    {
      label: "FINANCING",
      href: "/financing",
      // hasDropdown: true,
    },
    {
      label: "FLEET",
      href: "/fleet",
    },
    {
      label: "DEALS",
      href: "/deals",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
