import Features from "@/components/home/features";
import Founders from "@/components/home/founders";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import PopularCities from "@/components/home/popular-cities";
import Support from "@/components/home/support";

export default function Home() {
  return (<>
    {/* Hero section */}
    <Hero />

    {/* How it Works */}
    <HowItWorks />
    
    {/* features */}
    <Features />

    {/* Popular cities */}
    <PopularCities />

    {/* Founder */}
    <Founders />

    {/* Support team */}
    <Support />

  </>);
}
