"use client";

import React, { useState, useEffect } from "react"; 
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./mobile-menu";
import { cn } from "@/lib/utils";
import {
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Building, HandCoins, Droplets, Globe, ChevronDown, ChevronUp } from "lucide-react";
import TopBanner from "./top-banner";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  
  const [isNavVisible, setIsNavVisible] = useState(true);   
  const [isBannerVisible, setIsBannerVisible] = useState(true);   
  const [ lastScrollY, setLastScrollY ] = useState(0);
  
   // --- Logic to hide navbar on specific pages ---
  // We check if the current URL path ends with '/gallery'
  const isGalleryPage = pathname.endsWith('/gallery');
  
  useEffect(() => {
    // If we are on the gallery page, don't attach scroll listeners
    if (isGalleryPage) return;


    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const SCROLL_THRESHOLD = 100; 
      
      if (currentScrollY <= 10) {
        setIsNavVisible(true);
        setIsBannerVisible(true);
      } else if (currentScrollY > lastScrollY) {        
        setIsNavVisible(false);
      } else {        
        setIsNavVisible(true);
      }
            
      if (currentScrollY > SCROLL_THRESHOLD) {
          setIsBannerVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ lastScrollY, isGalleryPage ]);
  
   // --- Conditional return ---
  // If it's a gallery page, the component renders nothing.
  if (isGalleryPage) {
    return null;
  }

  // If not a gallery page, render the navbar as usual.

  return (    
    <div className={cn(
        "fixed top-0 w-full z-50 shadow-md transition-transform duration-300 ease-in-out",
        // When isNavVisible is false, the entire block slides out of view
        isNavVisible ? "translate-y-0" : "-translate-y-full"
    )}>
      
      {/* Site Banner with its own height transition */}
      <div className={cn(
          "transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden",
          // This allows the banner to hide even when the main nav is visible on scroll-up
          isBannerVisible ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
      )}>
        <TopBanner />
      </div>
      
      
      {/* Top site menu */}
      <div className="bg-[#0a2f5c] text-white hidden md:block">        
        <nav className="flex items-center max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-4 md:-py-1">
          <div className="ml-auto flex items-center gap-x-6">
              <Link href="/about" className="flex items-center gap-2 text-base hover:text-gray-300 transition-colors">                
                <span>About</span>
              </Link>
            <div
              className="relative"
              onMouseEnter={() => setHoveredMenu("Services")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link href="#" className={`px-3 rounded-md text-sm font-medium transition-colors hover:text-gray-300`}>
                <div className="flex items-center gap-x-2">
                  Service {hoveredMenu === "Services" ? <ChevronUp className="w-4 h-auto" /> : <ChevronDown className="w-4 h-auto" />}
                </div>
              </Link>
              {hoveredMenu === "Services" && (
                <div className="absolute top-12 left-0 z-10 w-64 bg-primary shadow-lg rounded-md border border-gray-200">
                  <Link href="/general-construction" className={`block px-4 py-2 text-sm text-white hover:bg-primary-foreground`}>
                    <div className="flex gap-4 items-center"><Building className="w-6 h-6 text-slate-100" /><span>GENERAL CONSTRUCTION</span></div>
                  </Link>
                  <Link href="/sales-and-supply" className={`block px-4 py-2 text-sm text-white hover:bg-primary-foreground`}>
                     <div className="flex gap-4 items-center"><HandCoins className="w-6 h-6 text-slate-100" /><span>SALES & SUPPLY</span></div>
                  </Link>
                  <Link href="/water" className={`block px-4 py-2 text-sm text-white hover:bg-primary-foreground`}>
                    <div className="flex gap-4 items-center"><Droplets className="w-6 h-6 text-slate-100" /><span>WATER</span></div>
                  </Link>
                </div>
              )}
            </div>                           
              <Link href="/careers" className="text-base hover:text-gray-300 transition-colors">Careers</Link>
              <button className="flex items-center gap-2 text-base hover:text-gray-300 transition-colors">
                <Globe className="h-5 w-5" />
                <span>Language</span>
              </button>
          </div>
        </nav>
      </div>

      {/* Main site menu */}
      <div className="bg-white py-2 md:py-0 ">
        <div className="flex items-center justify-between max-w-[1230px] 2xl:max-w-[1390px] mx-auto px-4 overflow-hidden">
          <Link href="/" className="flex items-center">            
            <Image width={160} height={240} src="/assets/logo/site-logo.png" alt="desktop logo" className="mt-2 hidden md:block" />
            <Image width={120} height={160} src="/assets/logo/site-logo.png" alt="mobile logo" className="mt-2 block md:hidden" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-2 relative">
            <Link href="/properties" className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${ pathname === "/properties" ? "bg-primary text-white" : "text-gray-600 hover:bg-primary hover:text-gray-800"}`}>
              Property Search
            </Link>
            <Link href="/guide" className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${ pathname === "/guide" ? "bg-primary text-white" : "text-gray-600 hover:bg-primary hover:text-gray-800"}`}>
              Guide
            </Link>
              {/* dropdown to explore more projects */}
            <div className="relative" onMouseEnter={() => setHoveredMenu("Properties")} onMouseLeave={() => setHoveredMenu(null)}>
              <Link href="#" className={`px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-600 hover:text-gray-800`}>
                <div className="flex items-center gap-2 text-base">
                  Our Projects {hoveredMenu === "Properties" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </Link>
              {hoveredMenu === "Properties" && (
                <div className="absolute top-12 left-0 z-50 mt-1 w-48 bg-primary shadow-lg rounded-md border border-gray-200">
                  <Link href="/project-one" className={`block px-4 py-2 text-sm text-white hover:bg-primary-foreground`}>Project One</Link>
                </div>
              )}
            </div>

            <Link href="/news" className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${ pathname === "/news" ? "bg-primary text-white" : "text-gray-600 hover:bg-primary hover:text-gray-800"}`}>
              Insights
            </Link>
          
            <Link href="/inquire" className={`px-3 py-2 rounded-md text-base font-medium transition-colors border-yellow-600 border ${ pathname === "/inquire" ? "bg-primary text-white" : "text-gray-600 hover:bg-primary hover:text-gray-800"}`}>
              Get a free evaluation
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <Link href="/inquire" className="bg-primary text-white px-4 py-2 shadow-lg flex items-center justify-center">Inquire</Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";