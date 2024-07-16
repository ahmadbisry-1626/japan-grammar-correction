import HeroSection from "@/components/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen items-center justify-center !bg-[#ebebeb] max-lg:py-32 relative">
        <HeroSection />
    </main>
  );
}
