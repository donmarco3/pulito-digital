import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Offer } from "@/components/Offer";
import { Faq } from "@/components/Faq";
import { Enquiry } from "@/components/Enquiry";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Services />
        <Process />
        <Offer />
        <Faq />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
