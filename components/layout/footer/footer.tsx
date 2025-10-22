"use client";

import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube, Bot, MessageSquare } from "lucide-react"; 

const footerLinkGroups = [
  {
    title: "Our Service",
    links: [
      { label: "Rent", href: "#" },
      { label: "Our Solution", href: "#" },
      { label: "Reviews", href: "#" },
    ],
  },
  {
    title: "About RentHunter",
    links: [
      { label: "About us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Find your next accommodation",
    links: [
      { label: "Amsterdam", href: "#" },
      { label: "Rotterdam", href: "#" },
      { label: "Utrecht", href: "#" },
      { label: "Haarlem", href: "#" },
      { label: "Den Haag", href: "#" },
    ],
  },
];

const socialLinks = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "TikTok" }, // Placeholder icon
  { Icon: Bot, href: "#", label: "Reddit" },
];

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#081947] text-white">
      {/* --- Top CTA Section --- */}
      <div className="container mx-auto lg:max-w-5xl xl:max-w-6xl py-16 md:py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Ready to find your perfect home?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300">
            Join thousands of expats, students, and professionals who found their home with RentHunter.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              size="lg"
              className="bg-[#FF4F00] text-white font-bold hover:bg-[#FF4F00]/90 px-8 py-3 rounded-md text-base transition-transform hover:scale-105"
            >
              Search now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-3 rounded-md text-base transition-transform hover:scale-105"
            >
              Our solution
            </Button>
          </div>
        </motion.div>
      </div>

      {/* --- Main Footer Section --- */}
      <div className="bg-[#031136] py-16">
        <div className="container mx-auto lg:max-w-5xl xl:max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {/* Logo, Description & Socials */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <Image src="/assets/logo/site-logo.png" alt="RentHunter Logo" width={150} height={30} />
              </Link>
              <p className="text-sm text-slate-400 max-w-xs">
                Automating housing search for expats, students, and young professionals in the Netherlands.
              </p>
              <div className="flex items-center gap-4 mt-6">
                {socialLinks.map(({ Icon, href, label }) => (
                  <Link key={label} href={href} aria-label={label} className="text-slate-400 hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Link Groups */}
            {footerLinkGroups.map((group) => (
              <div key={group.title} className="text-sm">
                <h3 className="font-bold text-white mb-4">{group.title}</h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Sub-Footer */}
          <div className="mt-16 pt-8 border-t border-slate-700 flex flex-col-reverse md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
            <p>&copy; {currentYear} Renthunter. All rights reserved</p>
            <div className="flex items-center gap-x-6 gap-y-2 flex-wrap justify-center">
              <Link href="#" className="hover:text-white">Terms and Conditions</Link>
              <Link href="#" className="hover:text-white">Legal Notice</Link>
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Cookie Policy</Link>
            </div>
             <div className="hidden lg:block p-2 rounded-full bg-white/10 cursor-pointer hover:bg-white/20">
                <MessageSquare className="w-5 h-5"/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;