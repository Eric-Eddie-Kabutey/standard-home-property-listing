"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu, Building, HandCoins, Droplets, Globe } from "lucide-react";

const MobileMenu = () => {
  const pathname = usePathname();

  // Helper component to create consistent link styles
  const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <div className="flex border-b border-slate-700">
      <Link
        href={href}
        className={`w-full block px-4 py-3 text-lg font-medium transition-colors ${
          pathname === href
            ? "bg-primary text-white"
            : "text-white hover:bg-white/10"
        }`}
      >
        {children}
      </Link>
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-primary">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full bg-[#1A3850] p-0 text-white overflow-y-auto">
        <div className="mt-8">

          {/* --- Main Navigation --- */}
          <MobileNavLink href="/properties">Property Search</MobileNavLink>
          <MobileNavLink href="/guide">Guide</MobileNavLink>
          <MobileNavLink href="/news">Insights</MobileNavLink>
          
          <Accordion type="single" collapsible className="w-full">
            
            {/* Our Projects Accordion */}
            <AccordionItem value="item-projects" className="border-b border-slate-700">
              <AccordionTrigger className="px-4 py-3 text-lg font-medium hover:no-underline hover:bg-white/10">
                Our Projects
              </AccordionTrigger>
              <AccordionContent className="bg-black/20 pb-0">
                <Link href="/project-one" className="flex items-center gap-4 px-8 py-3 text-base text-white hover:bg-white/10">
                    Project One
                </Link>
                {/* Add more projects here as needed */}
              </AccordionContent>
            </AccordionItem>

            {/* --- Secondary Links (from top bar) --- */}

            <MobileNavLink href="/about">About</MobileNavLink>

            {/* Services Accordion (Simplified) */}
            <AccordionItem value="item-services" className="border-b border-slate-700">
              <AccordionTrigger className="px-4 py-3 text-lg font-medium hover:no-underline hover:bg-white/10">
                Services
              </AccordionTrigger>
              <AccordionContent className="bg-black/20 pb-0">
                <Link href="/general-construction" className="flex items-center gap-4 px-8 py-3 text-base text-white hover:bg-white/10">
                  <Building className="w-5 h-5" />
                  <span>GENERAL CONSTRUCTION</span>
                </Link>
                <Link href="/sales-and-supply" className="flex items-center gap-4 px-8 py-3 text-base text-white hover:bg-white/10">
                  <HandCoins className="w-5 h-5" />
                  <span>SALES & SUPPLY</span>
                </Link>
                <Link href="/water" className="flex items-center gap-4 px-8 py-3 text-base text-white hover:bg-white/10">
                  <Droplets className="w-5 h-5" />
                  <span>WATER</span>
                </Link>
              </AccordionContent>
            </AccordionItem>
            
            <MobileNavLink href="/careers">Careers</MobileNavLink>

          </Accordion>

          {/* Language Button */}
          <div className="flex border-b border-slate-700">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-lg font-medium text-left transition-colors hover:bg-white/10">
              <Globe className="w-5 h-5" />
              Language
            </button>
          </div>
        </div>

        {/* Inquire Link / Call to Action */}
        <div className="p-4 mt-8">
            <Link
              href="/inquire"
              className={`block w-full text-center py-3 rounded-md text-lg font-medium transition-colors border-yellow-600 border ${
                pathname === "/inquire"
                  ? "bg-primary text-white"
                  : "text-white bg-primary hover:bg-yellow-700"
              }`}
            >
              Get a free evaluation
            </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;