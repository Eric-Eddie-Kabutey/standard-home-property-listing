import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Building, Droplets, HandCoins } from "lucide-react";
export const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "#",
    label: "Properties",
    submenu: [
      { href: "/properties/alphabetcity", label: "Lands" },
      { href: "/properties/symphonique", label: "Homes" },
      { href: "/properties/vista-del-mare", label: "Offices" },
      { href: "/properties/willow-lane", label: "Warehouse" },
    ],
  },
  { href: "/news", label: "News" },
  {
    href: "#",
    label: "Services",
    megaMenu: [
      {
        category: "GENERAL CONSTRUCTION",
        icon: <Building className="w-6 h-6 mb-5 text-slate-100" />,
        services: [
          { href: "/services/web-development", label: "Assets Management" },
          { href: "/services/app-development", label: "Architectural Design" },
          {
            href: "/services/seo",
            label: "Commercial & Residential Construction",
          },
          { href: "/services/seo", label: "Construction Project Management" },
          { href: "/services/seo", label: "Interior Decoration" },
        ],
      },
      {
        category: "SALES & SUPPLY",
        icon: <HandCoins className="w-6 h-6 mb-5 text-slate-100" />,
        services: [
          { href: "/services/seo", label: "Sales & Leasing" },
          { href: "/services/seo", label: "Property Maintainance" },
        ],
      },
      {
        category: "WATER",
        icon: <Droplets className="w-6 h-6 mb-5 text-slate-100" />,
        services: [
          { href: "/services/cloud-solutions", label: "Borehole Drilling" },
          { href: "/services/cyber-security", label: "Water Extension" },
          {
            href: "/services/it-consulting",
            label: "Irrigational Dam Construction",
          },
        ],
      },
    ],
  },
  { href: "/inquire", label: "Inquire" },
];
const Footer = () => {
  const mainLinks = links.filter((link) => !link.submenu && !link.megaMenu);
  const propertyLinks =
    links.find((link) => link.label === "Properties")?.submenu || [];

  return (
    <footer className="bg-[#0d1f2d] text-white">
      {/* Main Footer Content */}
      <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-6">
          <Image
            src="/assets/logo/site-logo.png"
            width={160}
            height={100}
            alt="Standard Homes"
            className="h-20 w-auto"
          />
          <p className="text-gray-300 text-sm leading-relaxed">
            Creating premium, honest homes for fresh starts and new beginnings
            in The Gambia.
          </p>
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#1a3850] hover:bg-[#2a4a60]"
            >
              <FaFacebook className="text-white text-lg" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#1a3850] hover:bg-[#2a4a60]"
            >
              <FaInstagram className="text-white text-lg" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#1a3850] hover:bg-[#2a4a60]"
            >
              <FaWhatsapp className="text-white text-lg" />
            </Button>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-[#2a4a60]">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {mainLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Properties Column */}
        <div>
          <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-[#2a4a60]">
            Our Properties
          </h3>
          <ul className="space-y-3">
            {propertyLinks.map((property) => (
              <li key={property.href}>
                <Link
                  href={property.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {property.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-[#2a4a60]">
            Contact Us
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                2nd Floor MSJ Plaza, OIC Highway Brusubi, Kombo North, West
                Coast Region
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-gray-400" />
              <p className="text-gray-300 text-sm">+220 792 2004</p>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-gray-400" />
              <span className="text-gray-300 text-sm">
                standardhomesgambia@gmail.com
              </span>
            </div>
            <Button className="mt-4 bg-[#3a7d44] hover:bg-[#4a8d54] w-full">
              Request a Callback
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className=" py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-lg font-semibold mb-8 text-center">
            Our Payment Option
          </h3>

          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-6">
              {[
                "assets/logo/logo-ecobank.svg",
                "assets/logo/download.png",
                "assets/logo/mastercard.png",
                "assets/logo/visa.jpeg",
              ].map((logo, index) => (
                <div key={index} className="w-32 h-16 relative">
                  <Image
                    src={`/${logo}`}
                    alt="Bank Logo"
                    layout="fill"
                    objectFit="contain"
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0a1721] py-4">
        <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Standard Homes Co. Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <Link
        href="https://wa.me/+2207922004"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg transition-all hover:bg-[#128C7E] hover:shadow-xl"
      >
        <FaWhatsapp size={22} />
        <span className="font-semibold">Chat Now</span>
      </Link>
    </footer>
  );
};

export default Footer;
