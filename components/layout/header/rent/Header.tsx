import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";



const Header: FC = () => {
  return (
    <div className="bg-white text-[#0A2540]">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">          
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/assets/logo/site-logo.png"
              alt="RentHunter Logo"
              width={150}
              height={30}
            />
          </Link>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-5">
            <button aria-label="Select language" className="text-2xl p-1 rounded-md hover:bg-white/10 transition-colors">
              🇬🇧
            </button>
            <Button
              className="bg-[#FF4F00] text-white font-bold hover:bg-[#FF4F00]/90 rounded-lg px-5"
            >
              Sign up
            </Button>
            <Link href="#" className="text-[#FF4F00] font-medium hover:text-slate-300 transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </header>     
    </div>
  );
};

export default Header;