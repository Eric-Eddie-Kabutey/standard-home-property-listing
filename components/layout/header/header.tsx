"use client";

import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

// --- Data for navigation links ---
const navLinks = [
  { label: "Rent", href: "/rent" },
  { label: "Our Solution", href: "/our-solution" },
  { label: "About us", href: "/about-us" },
];

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  // --- Logic for hiding header on scroll ---
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsHidden(false);
      } else {        
        setIsHidden(true);
      }
            
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <motion.header    
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden && !isMenuOpen ? "hidden" : "visible"} 
      transition={{ duration: 0.35, ease: "easeInOut" }}      
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="container mx-auto lg:max-w-5xl xl:max-w-6xl">
        <div className="relative flex h-16 items-center justify-between rounded-2xl border border-white/20 bg-black/20 backdrop-blur-md px-6">
          
          {/* Logo */}
          <Link href="/" aria-label="Go to homepage">
            <Image src="/assets/logo/site-logo.png" alt="RentHunter Logo" width={150} height={30} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-white font-medium hover:text-slate-300 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <button aria-label="Select language" className="text-2xl p-1 rounded-md hover:bg-white/10 transition-colors">
              🇬🇧
            </button>
            <Button
              className="bg-[#FF4F00] text-white font-bold hover:bg-[#FF4F00]/90 rounded-lg px-5"
            >
              Sign up
            </Button>
            <Link href="#" className="text-white font-medium hover:text-slate-300 transition-colors">
              Log in
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden mt-2 overflow-hidden bg-slate-900/80 backdrop-blur-md rounded-lg"
            >
              <nav className="flex flex-col items-center p-6 space-y-6">
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-white text-lg font-medium">
                    {link.label}
                  </Link>
                ))}
                <div className="w-full border-t border-white/20" />
                <div className="flex flex-col items-center w-full space-y-4">
                   <Button
                      className="w-full bg-[#FF4F00] text-white font-bold hover:bg-[#FF4F00]/90 rounded-lg py-3 text-lg"
                    >
                      Sign up
                    </Button>
                    <Link href="#" onClick={() => setIsMenuOpen(false)} className="text-white text-lg font-medium">
                      Log in
                    </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;