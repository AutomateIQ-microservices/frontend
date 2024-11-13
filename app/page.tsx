import AppBar from "@/components/AppBar";
import Hero from "@/components/Hero";
import HeroVideo from "@/components/HeroVideo";
//import Image from "next/image";

export default function Home() {
  return (
    <div className="pb-48">
      <AppBar/>
      <Hero/>
      <div className="pt-4">
          <HeroVideo/>
      </div>
      
    </div>
  );
}
